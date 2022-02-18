module.exports = (container) => {
    const { schemas } = container.resolve('models')
    const { Notification } = schemas
    const addNotification = (cata) => {
        const ca = new Notification(cata)
        return ca.save()
    }
    const getNotificationById = (id) => {
        return Notification.findById(id)
    }
    const deleteNotification = (id) => {
        return Notification.findByIdAndRemove(id, { useFindAndModify: false })
    }
    const deletedNotification = (id) => {
        return Notification.findByIdAndUpdate(id, { deleted: 1 }, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const updateNotification = (id, n) => {
        return Notification.findByIdAndUpdate(id, n, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const checkIdExist = (id) => {
        return Notification.findOne({ id })
    }
    const getCount = (pipe = {}) => {
        return Notification.countDocuments(pipe)
    }
    const getNotificationAgg = (pipe) => {
        return Notification.aggregate(pipe)
    }
    const getNotification = (pipe, limit, skip, sort) => {
        return Notification.find(pipe).limit(limit).skip(skip).sort(sort)
    }
    const getNotificationNoPaging = (pipe) => {
        return Notification.find(pipe)
    }
    const removeNotification = (pipe) => {
        return Notification.deleteMany(pipe)
    }
    const findOne = (pipe) => {
        return Notification.findOne(pipe)
    }
    const updateMany = (pipe, value) => {
        return Notification.updateMany(pipe, value)
    }
    const updateOne = (pipe, value) => {
        return Notification.updateOne(pipe, value)
    }
    const find = (pipe) => {
        return Notification.find(pipe)
    }
    const bulkWrite = (arr) => {
        return Notification.bulkWrite(arr)
    }
    return {
        addNotification,
        getNotificationById,
        deleteNotification,
        deletedNotification,
        updateNotification,
        checkIdExist,
        getCount,
        getNotificationAgg,
        getNotification,
        findOne,
        getNotificationNoPaging,
        removeNotification,
        updateMany,
        find,
        updateOne,
        bulkWrite
    }
}
