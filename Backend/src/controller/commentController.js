module.exports = (container) => {
    const logger = container.resolve('logger')
    const ObjectId = container.resolve('ObjectId')
    const {
        schemaValidator,
        schemas: {
            Comment
        }
    } = container.resolve('models')
    const { httpCode, serverHelper } = container.resolve('config')
    const { commentRepo } = container.resolve('repo')
    const addComment = async (req, res) => {
        try {
            const thoauoc = req.body
            const {
                error,
                value
            } = await schemaValidator(thoauoc, 'Comment')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
            }
            const sp = await commentRepo.addComment(value)
            res.status(httpCode.CREATED).send(sp)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).end()
        }
    }
    const deleteComment = async (req, res) => {
        try {
            const { id } = req.params
            if (id) {
                await commentRepo.deleteComment(id)
                res.status(httpCode.SUCCESS).send({ ok: true })
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const getCommentById = async (req, res) => {
        try {
            const { id } = req.params
            if (id) {
                const comment = await commentRepo.getCommentById(id)
                res.status(httpCode.SUCCESS).send(comment)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const updateComment = async (req, res) => {
        try {
            const { id } = req.params
            const comment = req.body
            const {
                error,
                value
            } = await schemaValidator(comment, 'Comment')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
            }
            if (id && comment) {
                const sp = await commentRepo.updateComment(id, value)
                res.status(httpCode.SUCCESS).send(sp)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const getComment = async (req, res) => {
        try {
            let {
                page,
                perPage,
                sort,
                ids
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
            const pipe = {}
            Object.keys(search).forEach(i => {
                const vl = search[i]
                const pathType = (Comment.schema.path(i) || {}).instance || ''
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
            const data = await commentRepo.getComment(pipe, perPage, skip, sort)
            const total = await commentRepo.getCount(pipe)
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
    return {
        addComment,
        getComment,
        getCommentById,
        updateComment,
        deleteComment
    }
}
