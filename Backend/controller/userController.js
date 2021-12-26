const { use } = require('express/lib/router')
module.exports = (container) => {
    const { schemaValidator, schemas: { User } } = container.resolve('models')
    const {
        httpCode,
        serverHelper
    } = container.resolve('config')
    const logger = container.resolve('logger')
    const ObjectId = container.resolve('ObjectId')
    const {
        userRepo,
        sessionRepo,
    } = container.resolve('repo')
    const MAX_LOGIN = +process.env.MAX_LOGIN || 2
    const addUser = async (req, res) => {
        try {
            const user = req.body
            const {
                error,
                value
            } = await schemaValidator(user, 'User')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
            }
            value.password = serverHelper.encryptPassword(value.password)
            value.isAdministrator = 0
            const sp = await userRepo.addUser(value)
            res.status(httpCode.SUCCESS).send({
                msg: 'Thêm thành công.',
                data: sp
            })
        } catch (e) {
            if (e.code === 11000) {
                return res.status(httpCode.BAD_REQUEST).json({ msg: 'Tên đăng nhập đã tồn tại, vui lòng thử lại.' })
            }
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).end()
        }
    }
    const logout = async (req, res) => {
        try {
            const token = req.headers['x-access-token'] || ''
            await sessionRepo.removeSession({ hash: serverHelper.generateHash(token) })
            res.status(httpCode.SUCCESS).json({ ok: true })
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).end()
        }
    }
    const login = async (req, res) => {
        try {
            const {
                username,
                password
            } = req.body
            if (username && password) {
                const user = await userRepo.login({
                    username,
                    password: serverHelper.encryptPassword(password)
                })
                if (user) {
                    const u = user.toObject()
                    const token = serverHelper.genToken(u)
                    const { exp } = serverHelper.decodeToken(token)
                    await sessionRepo.addSession(serverHelper.generateHash(token), u._id, exp)
                    const uDb = await userRepo.getUserById(String(u._id))
                    const menus = serverHelper.getAllPermissionOfUser(uDb.toObject())
                    const allSess = await sessionRepo.getSession({ userId: String(u._id) })
                    while (allSess.length > MAX_LOGIN) {
                        await sessionRepo.removeSessionById(String((allSess.pop())._id))
                    }
                    return res.status(httpCode.SUCCESS).json({
                        ...u,
                        token,
                        menus
                    })
                }
                res.status(httpCode.BAD_REQUEST).json({ msg: 'Tên tài khoản hoặc mật khẩu không đúng.' })
            } else {
                return res.status(httpCode.BAD_REQUEST).json({ msg: 'Vui long nhap username, password' })
            }
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'Co loi xay ra' })
        }
    }
    const refreshToken = async (req, res) => {
        try {
            const token = req.headers['x-access-token']
            if (token) {
                const user = serverHelper.decodeToken(token)
                if (user) {
                    const u = (await userRepo.getUserById(user._id)).toObject()
                    delete u.roles
                    delete u.groups
                    const newToken = serverHelper.genToken(u)
                    await sessionRepo.updateSessionByCondition({
                        userId: user._id,
                        hash: serverHelper.generateHash(token)
                    }, { hash: serverHelper.generateHash(newToken) })
                    return res.status(httpCode.SUCCESS).json({ token: newToken })
                }
            }
            res.status(httpCode.UNAUTHORIZED).json({ msg: 'Phiên làm việc không hợp lệ' })
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'Co loi xay ra' })
        }
    }
    const deleteUser = async (req, res) => {
        try {
            const { id } = req.params
            if (id) {
                await userRepo.deleteUser(id)
                res.status(httpCode.SUCCESS).send({ msg: 'Xóa thành công.' })
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const getUserById = async (req, res) => {
        try {
            const { id } = req.params
            if (id) {
                const user = await userRepo.getUserById(id)
                res.status(httpCode.SUCCESS).send(user)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const changePassword = async (req, res) => {
        try {
            const {
                oldPassword,
                newPassword
            } = req.body
            const username = req.user.username
            if (newPassword && oldPassword) {
                const user = await userRepo.getUser({
                    username,
                    password: serverHelper.encryptPassword(oldPassword)
                })
                if (user) {
                    const u = await userRepo.updateUser(req.user._id, {
                        password: serverHelper.encryptPassword(newPassword),
                        changePasswordAt: Math.floor(Date.now() / 1000)
                    })
                    logger.d(user, u)
                    res.status(httpCode.SUCCESS).json({ msg: 'Thay đổi mật khẩu thành công.' })
                } else {
                    res.status(httpCode.BAD_REQUEST).json({ msg: 'Mật khẩu cũ không chính xác, vui lòng thử lại.' })
                }
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const updateSelfInfo = async (req, res) => {
        try {
            const body = req.body
            delete body.roles
            delete body.username
            delete body.groups
            delete body.password
            delete body.roleEmail
            delete body.under
            delete body.unit
            delete body.readonly
            const u = await userRepo.updateUser(req.user._id, body)
            res.status(httpCode.SUCCESS).json({
                ok: true,
                user: u
            })
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const updateUser = async (req, res) => {
        try {
            const { id } = req.params
            const body = req.body
            if (id && body) {
                const {
                    error,
                    value: user
                } = await schemaValidator(body, 'User')
                if (error) {
                    return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
                }
                if (user.password) {
                    user.password = serverHelper.encryptPassword(user.password)
                }
                if (user.username) {
                    const old = await userRepo.getUserByUsername(user.username)
                    if (old && String(old._id) !== id) {
                        return res.status(httpCode.BAD_REQUEST).json({ msg: 'Username đã tồn tại, không thể thay đổi thành username này.' })
                    }
                }
                const uDb = await userRepo.getUserById(id)
                user.isAdministrator = uDb.isAdministrator || 0
                const sp = await userRepo.updateUser(id, user)
                res.status(httpCode.SUCCESS).send({
                    msg: 'Sửa thành công.',
                    data: sp
                })
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const checkUserId = async (req, res) => {
        try {
            const { id } = req.params
            if (id) {
                const sp = await userRepo.checkIdExist(id)
                res.status(httpCode.SUCCESS).send({ exist: !!sp })
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const loginViaIp = async (req, res) => {
        try {
            const ip = req.headers['X-Forwarded-For'] || req.headers['x-forwarded-for'] || req.ip
            if (!ip) {
                return res.status(httpCode.SUCCESS).json({ ok: false })
            }
            const ipUser = await ipUserRepo.findOne({ ip })
            if (ipUser && ipUser.userId) {
                const u = (await userRepo.getUserById(String(ipUser.userId))).toObject()
                const token = serverHelper.genToken(u)
                const { exp } = serverHelper.decodeToken(token)
                await sessionRepo.addSession(serverHelper.generateHash(token), u._id, exp)
                const menus = []// serverHelper.getAllPermissionOfUser(u)
                await sessionRepo.removeSession({ userId: String(u._id) })
                return res.status(httpCode.SUCCESS).json({
                    ok: true,
                    data: {
                        ...u,
                        token,
                        menus
                    }
                })
            }
            res.status(httpCode.SUCCESS).json({ ok: false })
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const getUser = async (req, res) => {
        try {
            let {
                page,
                perPage,
                sort,
                ids,
                queryType
            } = req.query
            page = +page || 1
            perPage = +perPage || 10
            sort = +sort === 0 ? 0 : +sort || 1
            const skip = (page - 1) * perPage
            let search = { ...req.query }
            if (ids) {
                if (ids.constructor === Array) {
                    search.id = { $in: ids }
                } else if (ids.constructor === String) {
                    search.id = { $in: ids.split(',') }
                }
            }
            if (!req.user.isAdministrator) {
                search.isAdministrator = 0
            }
            delete search.ids
            delete search.page
            delete search.perPage
            delete search.sort
            delete search.queryType
            Object.keys(search).forEach(i => {
                const vl = search[i]
                const pathType = (User.schema.path(i) || {}).instance || ''
                if (pathType.toLocaleLowerCase() === 'objectid') {
                    search[i] = ObjectId(vl)
                } else if (pathType === 'Number') {
                    search[i] = +vl
                } else if (pathType === 'String' && vl.constructor === String) {
                    search[i] = new RegExp(vl, 'gi')
                } else {
                    search[i] = vl
                }
            })
            if (queryType === 'or') {
                search = { $or: Object.keys(search).map(i => ({ [i]: search[i] })) }
            }
            const data = await userRepo.getUserByCondition(search, perPage, skip, sort)
            res.status(httpCode.SUCCESS).json({
                perPage,
                page,
                skip,
                sort,
                ...data
            })
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    return {
        addUser,
        getUser,
        updateUser,
        deleteUser,
        getUserById,
        checkUserId,
        login,
        refreshToken,
        changePassword,
        updateSelfInfo,
        loginViaIp,
        logout,
    }
}
