module.exports = (joi, mongoose, {joi2MongoSchema, serverHelper}) => {
    const {ObjectId} = mongoose.Types
    const tagJoi = joi.object({
        name:joi.string().required(),
        slug: joi.string().allow('')
    })
    const tagSchema = joi2MongoSchema(tagJoi, {
    },{
        createdBy: {
            type: ObjectId,
            ref: 'User'
        },
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
    const documentModel = mongoose.model('Tag', tagSchema)
    documentModel.syncIndexes()
    return documentModel

}


