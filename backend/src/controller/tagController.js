module.exports = (container) => {
    const logger = container.resolve('logger')
    const ObjectId = container.resolve('ObjectId')
    const {
        schemaValidator,
        schemas: {
            Tag
        }
    } = container.resolve('models')
    const { httpCode, serverHelper } = container.resolve('config')
    const { tagRepo, fileRepo, signRequestRepo, folderRepo } = container.resolve('repo')
    const addTag = async (req, res) => {
        try {
            const body = req.body
            const {
                error,
                value
            } = await schemaValidator(body, 'Tag')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
            }
            value.createdBy = req.user._id
            const sp = await tagRepo.addTag(value)
            res.status(httpCode.CREATED).send(sp)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).end()
        }
    }
    const addTags = async (req, res) => {
        try {
            const tags = req.body
            const arr = []
            for (const tag of tags) {
                const { error, value } = await schemaValidator(tag, 'Tag')
                if (error) {
                    return res.status(httpCode.BAD_REQUEST).json({ msg: error })
                }
                arr.push({
                    updateOne: {
                        filter: { name: value.name },
                        update: value,
                        upsert: true
                    }
                })
            }
            const sp = await tagRepo.bulkWrite(arr)
            res.status(httpCode.CREATED).send(sp)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).end()
        }
    }
    const deleteTag = async (req, res) => {
        try {
            const { id } = req.params
            if (id) {
                await tagRepo.deleteTag(id)
                res.status(httpCode.SUCCESS).send({ ok: true })
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const getTagById = async (req, res) => {
        try {
            const { id } = req.params
            if (id) {
                const tag = await tagRepo.getTagById(id)
                res.status(httpCode.SUCCESS).send(tag)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const updateTag = async (req, res) => {
        try {
            const { id } = req.params
            const tag = req.body
            const {
                error,
                value
            } = await schemaValidator(tag, 'Tag')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
            }
            if (id && tag) {
                const sp = await tagRepo.updateTag(id, value)
                res.status(httpCode.SUCCESS).send(sp)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    const getTag = async (req, res) => {
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
            if (slug) {
                pipe.slug = new RegExp(serverHelper.stringToSlug(slug), 'gi')
            }
            Object.keys(search).forEach(i => {
                const vl = search[i]
                const pathType = (Tag.schema.path(i) || {}).instance || ''
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
            const data = await tagRepo.getTag(pipe, perPage, skip, sort)
            const total = await tagRepo.getCount(pipe)
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
    const tagList = async (req, res) => {
        try {
            const list = await tagRepo.getTagNoPaging({})
            res.status(httpCode.SUCCESS).send(list)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
        }
    }
    return {
        addTag,
        getTag,
        getTagById,
        updateTag,
        deleteTag,
        tagList,
        addTags,
    }
}
