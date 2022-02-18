module.exports = (joi, mongoose, {joi2MongoSchema, serverHelper}) => {
    const {ObjectId} = mongoose.Types
    const tagJoi = joi.object({
        articleId: joi.string().required,
        like: joi.array().items(joi.string()).default([]),
        dislike: joi.array().items(joi.string()).default([])
    })
    const tagSchema = joi2MongoSchema(tagJoi, {
        articleId: {
            type: ObjectId,
            ref: 'Article'
        },
        like: [
            {
                type: ObjectId,
                ref: 'User'
            }
        ],
        dislike: [
            {
                type: ObjectId,
                ref: 'User'
            }
        ]
    },{

        createdAt: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        }
    })
    tagSchema.statics.validateObj = async (obj, config = {}) => {
        const {
            error,
            value
        } = await tagJoi.validate(obj, config)
        if (!error) {
            value.slug = serverHelper.stringToSlug(value.name)
        }
        return { error, value }
    }
    const documentModel = mongoose.model('Like', tagSchema)
    documentModel.syncIndexes()
    return documentModel

}


