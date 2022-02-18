module.exports = (joi, mongoose, {joi2MongoSchema, serverHelper}) => {
    const {ObjectId} = mongoose.Types
    const notificationJoi = joi.object({
        articleId: joi.string().required(),
        sendId: joi.string().required(),
        receiveId: joi.string().required()
    })
    const notificationSchema = joi2MongoSchema(notificationJoi, {
        articleId: {
            type:ObjectId,
            ref: 'Article'
        },
        sendId: {
            type: ObjectId,
            ref: 'User'
        },
        receiveId: {
            type: ObjectId,
            ref: 'User'
        }

    },{
        createdAt: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        }
    })
    notificationSchema.statics.validateObj = async (obj, config = {}) => {
        const {
            error,
            value
        } = await notificationJoi.validate(obj, config)
        if (!error) {
            value.slug = serverHelper.stringToSlug(value.name)
        }
        return { error, value }
    }
    const documentModel = mongoose.model('Notification', notificationSchema)
    documentModel.syncIndexes()
    return documentModel

}


