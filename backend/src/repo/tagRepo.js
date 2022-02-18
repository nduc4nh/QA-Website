module.exports = (container) => {
    const { schemas } = container.resolve('models')
    const { Tag } = schemas
    const addTag = (cata) => {
        const ca = new Tag(cata)
        return ca.save()
    }
    const getTagById = (id) => {
        return Tag.findById(id)
    }
    const deleteTag = (id) => {
        return Tag.findByIdAndRemove(id, { useFindAndModify: false })
    }
    const deletedTag = (id) => {
        return Tag.findByIdAndUpdate(id, { deleted: 1 }, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const updateTag = (id, n) => {
        return Tag.findByIdAndUpdate(id, n, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const checkIdExist = (id) => {
        return Tag.findOne({ id })
    }
    const getCount = (pipe = {}) => {
        return Tag.countDocuments(pipe)
    }
    const getTagAgg = (pipe) => {
        return Tag.aggregate(pipe)
    }
    const getTag = (pipe, limit, skip, sort) => {
        return Tag.find(pipe).limit(limit).skip(skip).sort(sort)
    }
    const getTagNoPaging = (pipe) => {
        return Tag.find(pipe)
    }
    const removeTag = (pipe) => {
        return Tag.deleteMany(pipe)
    }
    const findOne = (pipe) => {
        return Tag.findOne(pipe)
    }
    const updateMany = (pipe, value) => {
        return Tag.updateMany(pipe, value)
    }
    const updateOne = (pipe, value) => {
        return Tag.updateOne(pipe, value)
    }
    const find = (pipe) => {
        return Tag.find(pipe)
    }
    const bulkWrite = (arr) => {
        return Tag.bulkWrite(arr)
    }
    return {
        addTag,
        getTagById,
        deleteTag,
        deletedTag,
        updateTag,
        checkIdExist,
        getCount,
        getTagAgg,
        getTag,
        findOne,
        getTagNoPaging,
        removeTag,
        updateMany,
        find,
        updateOne,
        bulkWrite
    }
}
