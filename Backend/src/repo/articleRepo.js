module.exports = (container) => {
    const { schemas } = container.resolve('models')
    const { Article } = schemas
    const addArticle = (cata) => {
        const ca = new Article(cata)
        return ca.save()
    }
    const getArticleById = (id) => {
        return Article.findById(id)
    }
    const deleteArticle = (id) => {
        return Article.findByIdAndRemove(id, { useFindAndModify: false })
    }
    const deletedArticle = (id) => {
        return Article.findByIdAndUpdate(id, { deleted: 1 }, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const updateArticle = (id, n) => {
        return Article.findByIdAndUpdate(id, n, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const checkIdExist = (id) => {
        return Article.findOne({ id })
    }
    const getCount = (pipe = {}) => {
        return Article.countDocuments(pipe)
    }
    const getArticleAgg = (pipe) => {
        return Article.aggregate(pipe)
    }
    const getArticle = (pipe, limit, skip, sort) => {
        return Article.find(pipe).limit(limit).skip(skip).sort(sort)
    }
    const getArticleNoPaging = (pipe) => {
        return Article.find(pipe)
    }
    const removeArticle = (pipe) => {
        return Article.deleteMany(pipe)
    }
    const findOne = (pipe) => {
        return Article.findOne(pipe)
    }
    const updateMany = (pipe, value) => {
        return Article.updateMany(pipe, value)
    }
    const updateOne = (pipe, value) => {
        return Article.updateOne(pipe, value)
    }
    const find = (pipe) => {
        return Article.find(pipe)
    }
    const bulkWrite = (arr) => {
        return Article.bulkWrite(arr)
    }
    return {
        addArticle,
        getArticleById,
        deleteArticle,
        deletedArticle,
        updateArticle,
        checkIdExist,
        getCount,
        getArticleAgg,
        getArticle,
        findOne,
        getArticleNoPaging,
        removeArticle,
        updateMany,
        find,
        updateOne,
        bulkWrite
    }
}
