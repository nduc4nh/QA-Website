module.exports = (joi, mongoose, {joi2MongoSchema, serverHelper}) => {
    const {ObjectId} = mongoose.Types
    const categoryJoi = joi.object({
        articleId: joi.string().required(),
        userId: joi.string().required(),
        content: joi.string().required(),
        like: joi.number().default(0),
        dislike: joi.number().default(0)

    })
    const userSchema = joi2MongoSchema(categoryJoi, {
        articleId: {
            type: ObjectId,
            ref: 'Article'
        },
        userId: {
            type: ObjectId,
            ref: 'User'
        }


    }, {
        createdAt: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        },
        updateAt: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        }
    })
    userSchema.statics.validateObj = async (obj, config = {}) => {
        return categoryJoi.validate(obj, config)
    }
    const documentModel = mongoose.model('Comment', userSchema)
    documentModel.syncIndexes()
    return documentModel

}

