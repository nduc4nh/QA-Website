module.exports = (container) => {
    const { schemas } = container.resolve('models')
    const { Comment } = schemas
    const addComment = (cata) => {
        const ca = new Comment(cata)
        return ca.save()
    }
    const getCommentById = (id) => {
        return Comment.findById(id)
    }
    const deleteComment = (id) => {
        return Comment.findByIdAndRemove(id, { useFindAndModify: false })
    }
    const deletedComment = (id) => {
        return Comment.findByIdAndUpdate(id, { deleted: 1 }, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const updateComment = (id, n) => {
        return Comment.findByIdAndUpdate(id, n, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const checkIdExist = (id) => {
        return Comment.findOne({ id })
    }
    const getCount = (pipe = {}) => {
        return Comment.countDocuments(pipe)
    }
    const getCommentAgg = (pipe) => {
        return Comment.aggregate(pipe)
    }
    const getComment = (pipe, limit, skip, sort) => {
        return Comment.find(pipe).limit(limit).skip(skip).sort(sort)
    }
    const getCommentNoPaging = (pipe) => {
        return Comment.find(pipe)
    }
    const removeComment = (pipe) => {
        return Comment.deleteMany(pipe)
    }
    const findOne = (pipe) => {
        return Comment.findOne(pipe).populate(['articleId', 'comments.userId'])
    }
    const updateMany = (pipe, value) => {
        return Comment.updateMany(pipe, value)
    }
    const updateOne = (pipe, value) => {
        return Comment.updateOne(pipe, value)
    }
    const find = (pipe) => {
        return Comment.find(pipe)
    }
    const bulkWrite = (arr) => {
        return Comment.bulkWrite(arr)
    }
    return {
        addComment,
        getCommentById,
        deleteComment,
        deletedComment,
        updateComment,
        checkIdExist,
        getCount,
        getCommentAgg,
        getComment,
        findOne,
        getCommentNoPaging,
        removeComment,
        updateMany,
        find,
        updateOne,
        bulkWrite
    }
}
