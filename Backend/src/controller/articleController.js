module.exports = (container) => {
    const logger = container.resolve('logger')
    const ObjectId = container.resolve('ObjectId')
    const {
        schemaValidator,
        schemas: {
            Article
        }
    } = container.resolve('models')
    const { httpCode, serverHelper } = container.resolve('config')
    const { articleRepo } = container.resolve('repo')
    const addArticle = async (req, res) => {
        try {
            const thoauoc = req.body
            const {
                error,
                value
            } = await schemaValidator(thoauoc, 'Article')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
            }
            const sp = await articleRepo.addArticle(value)
            res.status(httpCode.CREATED).send(sp)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).end()
        }
    }
    const deleteArticle = async (req, res) => {
        try {
            const { id } = req.params
            if (id) {
                await articleRepo.deleteArticle(id)
                res.status(httpCode.SUCCESS).send({ ok: true })
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const getArticleById = async (req, res) => {
        try {
            const { id } = req.params
            if (id) {
                const article = await articleRepo.getArticleById(id)
                res.status(httpCode.SUCCESS).send(article)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const updateArticle = async (req, res) => {
        try {
            const { id } = req.params
            const article = req.body
            const {
                error,
                value
            } = await schemaValidator(article, 'Article')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
            }
            if (id && article) {
                const sp = await articleRepo.updateArticle(id, value)
                res.status(httpCode.SUCCESS).send(sp)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const getArticle = async (req, res) => {
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
                const pathType = (Article.schema.path(i) || {}).instance || ''
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
            const data = await articleRepo.getArticle(pipe, perPage, skip, sort)
            const total = await articleRepo.getCount(pipe)
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
        addArticle,
        getArticle,
        getArticleById,
        updateArticle,
        deleteArticle
    }
}
