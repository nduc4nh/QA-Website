module.exports = (container) => {
    const { schemas } = container.resolve('models')
    const { Category } = schemas
    const addCategory = (cata) => {
        const ca = new Category(cata)
        return ca.save()
    }
    const getCategoryById = (id) => {
        return Category.findById(id)
    }
    const deleteCategory = (id) => {
        return Category.findByIdAndRemove(id, { useFindAndModify: false })
    }
    const deletedCategory = (id) => {
        return Category.findByIdAndUpdate(id, { deleted: 1 }, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const updateCategory = (id, n) => {
        return Category.findByIdAndUpdate(id, n, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const checkIdExist = (id) => {
        return Category.findOne({ id })
    }
    const getCount = (pipe = {}) => {
        return Category.countDocuments(pipe)
    }
    const getCategoryAgg = (pipe) => {
        return Category.aggregate(pipe)
    }
    const getCategory = (pipe, limit, skip, sort) => {
        return Category.find(pipe).limit(limit).skip(skip).sort(sort)
    }
    const getCategoryNoPaging = (pipe) => {
        return Category.find(pipe)
    }
    const removeCategory = (pipe) => {
        return Category.deleteMany(pipe)
    }
    const findOne = (pipe) => {
        return Category.findOne(pipe)
    }
    const updateMany = (pipe, value) => {
        return Category.updateMany(pipe, value)
    }
    const updateOne = (pipe, value) => {
        return Category.updateOne(pipe, value)
    }
    const find = (pipe) => {
        return Category.find(pipe)
    }
    const bulkWrite = (arr) => {
        return Category.bulkWrite(arr)
    }
    return {
        addCategory,
        getCategoryById,
        deleteCategory,
        deletedCategory,
        updateCategory,
        checkIdExist,
        getCount,
        getCategoryAgg,
        getCategory,
        findOne,
        getCategoryNoPaging,
        removeCategory,
        updateMany,
        find,
        updateOne,
        bulkWrite
    }
}
