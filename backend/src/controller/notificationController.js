module.exports = (container) => {
    const logger = container.resolve('logger')
    const ObjectId = container.resolve('ObjectId')
    const {
        schemaValidator,
        schemas: {
            Notification
        }
    } = container.resolve('models')
    const { httpCode, serverHelper } = container.resolve('config')
    const { notificationRepo, articleRepo } = container.resolve('repo')
    const addNotification = async (req, res) => {
        try {
            const body = req.body
            const {
                error,
                value
            } = await schemaValidator(body, 'Notification')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
            }
            const data = await notificationRepo.addNotification(value)
            res.status(httpCode.CREATED).send(data)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).end()
        }
    }
    const deleteNotification = async (req, res) => {
        try {
            const { id } = req.params
            if (id) {
                await notificationRepo.deleteNotification(id)
                res.status(httpCode.SUCCESS).send({ ok: true })
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const getNotificationById = async (req, res) => {
        try {
            const { id } = req.params
            if (id) {
                const category = await notificationRepo.getNotificationById(id)
                res.status(httpCode.SUCCESS).send(category)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const updateNotification = async (req, res) => {
        try {
            const { id } = req.params
            const category = req.body
            const {
                error,
                value
            } = await schemaValidator(category, 'Notification')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
            }
            if (id && category) {
                const data = await notificationRepo.updateNotification(id, value)
                res.status(httpCode.SUCCESS).send(data)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const getNotification = async (req, res) => {
        try {
            let {
                page,
                perPage,
                sort,
                ids,
                slug
            } = req.query
            page = +page || 1
            perPage = +perPage || 10
            sort = +sort === 0 ? { _id: 1 } : +sort || { _id: -1 }
            const skip = (page - 1) * perPage
            const search = { ...req.query }
            if (ids) {
                if (ids.constructor === Array) {
                    search.id = { $in: ids }
                } else if (ids.constructor === String) {
                    search.id = { $in: ids.split(',') }
                }
            }
            delete search.ids
            delete search.page
            delete search.perPage
            delete search.sort
            delete search.slug
            const pipe = {}
            if(slug){
                pipe.slug = serverHelper.stringToSlug(slug)
            }
            Object.keys(search).forEach(i => {
                const vl = search[i]
                const pathType = (Notification.schema.path(i) || {}).instance || ''
                if (pathType.toLowerCase() === 'objectid') {
                    pipe[i] = ObjectId(vl)
                } else if (pathType === 'Number') {
                    pipe[i] = +vl
                } else if (pathType === 'String' && vl.constructor === String) {
                    pipe[i] = new RegExp(vl, 'gi')
                } else {
                    pipe[i] = vl
                }
            })
            const data = await notificationRepo.getNotification(pipe, perPage, skip, sort)
            const total = await notificationRepo.getCount(pipe)
            res.status(httpCode.SUCCESS).send({
                perPage,
                skip,
                sort,
                data,
                total,
                page
            })
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const getArticle = async (req, res) => {
        try {
            const { id } = req.params
            const data = await articleRepo.getArticleNoPaging({categories: ObjectId(id)})
            res.status(httpCode.SUCCESS).send(data)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ok: false})
        }
    }
    return {
        addNotification,
        getNotification,
        getNotificationById,
        updateNotification,
        deleteNotification,
        getArticle
    }
}
