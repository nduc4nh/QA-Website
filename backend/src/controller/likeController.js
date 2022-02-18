const http = require("http");
const Http = require("http");
module.exports = (container) => {
    const logger = container.resolve('logger')
    const ObjectId = container.resolve('ObjectId')
    const {
        schemaValidator,
        schemas: {
            Like
        }
    } = container.resolve('models')
    const {httpCode, serverHelper} = container.resolve('config')
    const {likeRepo, articleRepo} = container.resolve('repo')
    const addLike = async (req, res) => {
        try {
            const body = req.body
            const {
                error,
                value
            } = await schemaValidator(body, 'Like')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).send({msg: error.message})
            }
            const data = await likeRepo.addLike(value)
            res.status(httpCode.CREATED).send(data)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).end()
        }
    }
    const deleteLike = async (req, res) => {
        try {
            const {id} = req.params
            if (id) {
                await likeRepo.deleteLike(id)
                res.status(httpCode.SUCCESS).send({ok: true})
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ok: false})
        }
    }
    const getLikeById = async (req, res) => {
        try {
            const {id} = req.params
            if (id) {
                const like = await likeRepo.getLikeById(id)
                res.status(httpCode.SUCCESS).send(like)
            } else {
                res.status(httpCode.BAD_REQUEST).end()
            }
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ok: false})
        }
    }
    // const updateLike = async (req, res) => {
    //     try {
    //         const {id} = req.params
    //         const like = req.body
    //         const {
    //             error,
    //             value
    //         } = await schemaValidator(like, 'Like')
    //         if (error) {
    //             return res.status(httpCode.BAD_REQUEST).send({msg: error.message})
    //         }
    //         if (id && like) {
    //             const data = await likeRepo.updateLike(id, value)
    //             res.status(httpCode.SUCCESS).send(data)
    //         } else {
    //             res.status(httpCode.BAD_REQUEST).end()
    //         }
    //     } catch (e) {
    //         logger.e(e)
    //         res.status(httpCode.UNKNOWN_ERROR).send({ok: false})
    //     }
    // }
    const getLike = async (req, res) => {
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
            sort = +sort === 0 ? {_id: 1} : +sort || {_id: -1}
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
                pipe.slug = serverHelper.stringToSlug(slug)
            }
            Object.keys(search).forEach(i => {
                const vl = search[i]
                const pathType = (Like.schema.path(i) || {}).instance || ''
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
            const data = await likeRepo.getLike(pipe, perPage, skip, sort)
            const total = await likeRepo.getCount(pipe)
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
            res.status(httpCode.UNKNOWN_ERROR).send({ok: false})
        }
    }
    const getArticle = async (req, res) => {
        try {
            const {id} = req.params
            const data = await articleRepo.getArticleNoPaging({categories: ObjectId(id)})
            res.status(httpCode.SUCCESS).send(data)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ok: false})
        }
    }
    const updateLike = async (req, res) => {
        try {
            const {id} = req.params
            const {_id} = req.user
            if (id) {
                let like = await likeRepo.find({articleId: ObjectId(id)})
                const listLike = like[0].like.map(i => i.toString())
                const listDislike = like[0].dislike.map(i => i.toString())

                if (listLike.includes(_id)) {
                    const pull = {
                        $pull: {like: ObjectId(_id)}
                    }
                    await likeRepo.updateOne({articleId: ObjectId(id)}, pull, false, true)
                    return res.status(httpCode.SUCCESS).send({ok: true})
                } else if (listDislike.includes(_id)) {
                    const pull = {
                        $pull: {dislike: ObjectId(_id)}
                    }
                    await likeRepo.updateOne({articleId: ObjectId(id)}, pull, false, true)
                    const push = {
                        $push: { like: ObjectId(_id)}
                    }
                    await likeRepo.updateOne({articleId: ObjectId(id)}, push)
                    return res.status(httpCode.SUCCESS).send({ok: true})
                } else {
                    const push = {
                        $push: { like: ObjectId(_id)}
                    }
                    await likeRepo.updateOne({articleId: ObjectId(id)}, push)
                    return res.status(httpCode.SUCCESS).send({ok: true})
                }
            }
            res.status(httpCode.BAD_REQUEST).send({ok: false})
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ok: false})
        }
    }
    const updateDislike = async (req, res) => {
        try {
            const {id} = req.params
            const {_id} = req.user
            if (id) {
                let dislike = await likeRepo.find({articleId: ObjectId(id)})
                const listLike = dislike[0].like.map(i => i.toString())
                const listDislike = dislike[0].dislike.map(i => i.toString())
                if (listDislike.includes(_id)) {
                    const pull = {
                        $pull: { dislike: ObjectId(_id)}
                    }
                    await likeRepo.updateOne({articleId: ObjectId(id)}, pull, false, true)
                    return res.status(httpCode.SUCCESS).send({ok: true})
                } else if (listLike.includes(_id)) {
                    const pull = {
                        $pull: { like: ObjectId(_id)}
                    }
                    await likeRepo.updateOne({articleId: ObjectId(id)}, pull, false, true)
                    const push = {
                        $push: { dislike: ObjectId(_id)}
                    }
                    await likeRepo.updateOne({articleId: ObjectId(id)}, push)
                    return res.status(httpCode.SUCCESS).send({ok: true})
                } else {
                    const push = {
                        $push: { dislike: ObjectId(_id)}
                    }
                    await likeRepo.updateOne({articleId: ObjectId(id)}, push)
                    return res.status(httpCode.SUCCESS).send({ok: true})
                }
            }
            res.status(httpCode.BAD_REQUEST).send({ok: false})
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).send({ok: false})
        }
    }
    return {
        addLike,
        getLike,
        getLikeById,
        updateLike,
        deleteLike,
        getArticle,
        updateDislike
    }
}
