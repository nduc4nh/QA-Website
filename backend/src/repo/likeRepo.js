module.exports = (container) => {
    const { schemas } = container.resolve('models')
    const { Like } = schemas
    const addLike = (cata) => {
        const ca = new Like(cata)
        return ca.save()
    }
    const getLikeById = (id) => {
        return Like.findById(id)
    }
    const deleteLike = (id) => {
        return Like.findByIdAndRemove(id, { useFindAndModify: false })
    }
    const deletedLike = (id) => {
        return Like.findByIdAndUpdate(id, { deleted: 1 }, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const updateLike = (id, n) => {
        return Like.findByIdAndUpdate(id, n, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const checkIdExist = (id) => {
        return Like.findOne({ id })
    }
    const getCount = (pipe = {}) => {
        return Like.countDocuments(pipe)
    }
    const getLikeAgg = (pipe) => {
        return Like.aggregate(pipe)
    }
    const getLike = (pipe, limit, skip, sort) => {
        return Like.find(pipe).limit(limit).skip(skip).sort(sort)
    }
    const getLikeNoPaging = (pipe) => {
        return Like.find(pipe)
    }
    const removeLike = (pipe) => {
        return Like.deleteMany(pipe)
    }
    const findOne = (pipe) => {
        return Like.findOne(pipe).populate(['like', 'dislike'])
    }
    const updateMany = (pipe, value) => {
        return Like.updateMany(pipe, value)
    }
    const updateOne = (pipe, value) => {
        return Like.updateOne(pipe, value)
    }
    const find = (pipe) => {
        return Like.find(pipe)
    }
    const findMany = (pipe) => {
        return Like.find(pipe).populate(['like', 'dislike'])
    }
    const bulkWrite = (arr) => {
        return Like.bulkWrite(arr)
    }
    return {
        addLike,
        getLikeById,
        deleteLike,
        deletedLike,
        updateLike,
        checkIdExist,
        getCount,
        getLikeAgg,
        getLike,
        findOne,
        getLikeNoPaging,
        removeLike,
        updateMany,
        find,
        updateOne,
        bulkWrite,
        findMany
    }
}
