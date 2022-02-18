module.exports = (container) => {
    const logger = container.resolve('logger')
    const ObjectId = container.resolve('ObjectId')
    const {
        schemaValidator,
        schemas: {
            Category
        }
    } = container.resolve('models')
    const { httpCode, serverHelper } = container.resolve('config')
    const { categoryRepo, articleRepo } = container.resolve('repo')
    const addCategory = async (req, res) => {
        try {
            const body = req.body
            const {
                error,
                value
            } = await schemaValidator(body, 'Category')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
            }
            const data = await categoryRepo.addCategory(value)
            res.status(httpCode.CREATED).send(data)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).end()
        }
    }
    const deleteCategory = async (req, res) => {
        try {
            const { id } = req.params
            if (id) {
                await categoryRepo.deleteCategory(id)
                res.status(httpCode.SUCCESS).send({ ok: true })
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const getCategoryById = async (req, res) => {
        try {
            const { id } = req.params
            if (id) {
                const category = await categoryRepo.getCategoryById(id)
                res.status(httpCode.SUCCESS).send(category)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const updateCategory = async (req, res) => {
        try {
            const { id } = req.params
            const category = req.body
            const {
                error,
                value
            } = await schemaValidator(category, 'Category')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
            }
            if (id && category) {
                const data = await categoryRepo.updateCategory(id, value)
                res.status(httpCode.SUCCESS).send(data)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const getCategory = async (req, res) => {
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
                const pathType = (Category.schema.path(i) || {}).instance || ''
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
            const data = await categoryRepo.getCategory(pipe, perPage, skip, sort)
            const total = await categoryRepo.getCount(pipe)
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
        addCategory,
        getCategory,
        getCategoryById,
        updateCategory,
        deleteCategory,
        getArticle
    }
}
