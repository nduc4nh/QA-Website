module.exports = (container) => {
    const logger = container.resolve('logger')
    const ObjectId = container.resolve('ObjectId')
    const {
        schemaValidator,
        schemas: {
            Article
        }
    } = container.resolve('models')
    const {httpCode, serverHelper} = container.resolve('config')
    const {articleRepo, tagRepo, likeRepo} = container.resolve('repo')
    const addArticle = async (req, res) => {
        try {

            const {tags} = req.body
            delete req.body.tags
            const tagIds = []
            if (tags) {
                const arr = []
                for (const tag of tags) {
                    const a = {name: tag}
                    const {error, value} = await schemaValidator(a, 'Tag')
                    if (error) {
                        return res.status(httpCode.BAD_REQUEST).json({msg: error})
                    }
                    arr.push({
                        updateOne: {
                            filter: {name: value.name},
                            update: value,
                            upsert: true
                        }
                    })
                }
                const sp = await tagRepo.bulkWrite(arr)
                const selectDB = await tagRepo.find({name: {$in: tags}})
                selectDB.map(i => {
                    i = i.toObject()
                    tagIds.push(i._id.toString())
                })
            }
            const body = req.body
            body.tags = [...tagIds]
            const {
                error,
                value
            } = await schemaValidator(body, 'Article')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).send({msg: error.message})
            }
            value.createdBy = req.user._id.toString()
            const data = await articleRepo.addArticle(value)
            await likeRepo.addLike({articleId: data._id.toString()})
            res.status(httpCode.CREATED).send(data)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).end()
        }
    }
    const deleteArticle = async (req, res) => {
        try {
            const user = req.user
            if (!user) {
                return res.status(httpCode.BAD_REQUEST).send('Ban can dang nhap!')
            }
            const {id} = req.params
            if (id) {
                const data = await articleRepo.getArticleById(id)

                await articleRepo.deleteArticle(id)
                await likeRepo.removeLike({articleId: ObjectId(id)})
                res.status(httpCode.SUCCESS).send({ok: true})
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ok: false})
        }
    }
    const getArticleById = async (req, res) => {
        try {
            const {id} = req.params
            if (id) {
                let data = (await articleRepo.getArticleById(id)).toObject()
                const like = (await likeRepo.findOne({articleId: ObjectId(id)})).toObject()
                if (like.like) {
                    data.like = like.like
                } else {
                    data.like = []
                }
                if (like.dislike) {
                    data.dislike = like.dislike
                } else {
                    data.dislike = []
                }
                res.status(httpCode.SUCCESS).send(data)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ok: false})
        }
    }
    const getArticleAndComment = async (req, res) => {
        try {
            const {id} = req.params
            if (id) {
                const pipe = [
                    {
                        $match: {
                            _id: ObjectId(id)
                        }
                    },
                    {
                        $lookup: {
                            from: 'comments',
                            let: {id: '$_id'},
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {$eq: ['$articleId', '$$id']}
                                    }
                                },
                                {
                                    $lookup: {
                                        from: 'users',
                                        let: {userIds: '$userId'},
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {$eq: ['$_id', '$$userIds']}
                                                }
                                            }
                                        ],
                                        as: 'userComment'
                                    }
                                },
                                {
                                    $unset: 'userComment.password'
                                }
                            ],
                            as: 'comments'
                        }
                    }
                ]
                const updateClick = {
                    $inc: {clickCount: 1}
                }
                await articleRepo.updateArticle(id, updateClick)
                let data = await articleRepo.getArticleAgg(pipe)
                const like = (await likeRepo.findOne({articleId: ObjectId(id)})).toObject()
                data[0].like = like.like
                data[0].dislike = like.dislike
                res.status(httpCode.SUCCESS).send(data)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ok: false})
        }
    }
    const updateArticle = async (req, res) => {
        try {
            const {id} = req.params
            const {tags} = req.body
            delete req.body.tags
            const tagIds = []
            if (tags) {
                const arr = []
                for (const tag of tags) {
                    const a = {name: tag}
                    const {error, value} = await schemaValidator(a, 'Tag')
                    if (error) {
                        return res.status(httpCode.BAD_REQUEST).json({msg: error})
                    }
                    arr.push({
                        updateOne: {
                            filter: {name: value.name},
                            update: value,
                            upsert: true
                        }
                    })
                }
                await tagRepo.bulkWrite(arr)
                const selectDB = await tagRepo.find({name: {$in: tags}})
                selectDB.map(i => {
                    i = i.toObject()
                    tagIds.push(i._id.toString())
                })
            }
            const article = req.body
            article.tags = [...tagIds]
            const {
                error,
                value
            } = await schemaValidator(article, 'Article')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).send({msg: error.message})
            }
            if (id && article) {
                const data = await articleRepo.updateArticle(id, value)
                res.status(httpCode.SUCCESS).send(data)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ok: false})
        }
    }
    const getArticle = async (req, res) => {
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
            sort = +sort === 0 ? {createdAt: 1} : +sort || {createdAt: -1}
            const skip = (page - 1) * perPage
            const search = {...req.query}
            if (ids) {
                if (ids.constructor === Array) {
                    search.id = {$in: ids}
                } else if (ids.constructor === String) {
                    search.id = {$in: ids.split(',')}
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
            let data = await articleRepo.getArticle(pipe, perPage, skip, sort)
            let listId = data.map(i => i._doc._id.toString())
            const listLike = await likeRepo.findMany({articleId: {$in: listId}})
            const total = await articleRepo.getCount(pipe)
            res.status(httpCode.SUCCESS).send({
                perPage,
                skip,
                sort,
                data,
                listLike,
                total,
                page
            })
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ok: false})
        }
    }
    return {
        addArticle,
        getArticle,
        getArticleById,
        updateArticle,
        deleteArticle,
        getArticleAndComment
    }
}
