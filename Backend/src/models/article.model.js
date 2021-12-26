module.exports = (joi, mongoose, {joi2MongoSchema, serverHelper}) => {
    const {ObjectId} = mongoose.Types
    const articleJoi = joi.object({
        title:joi.string().required(),
        content: joi.string().required(),
        categorys: joi.array().items(joi.string())
    })
    const articleSchema = joi2MongoSchema(articleJoi, {
        username: {
            type: String,
            unique: true,
            lowercase: true,
            index: true
        },
        categories: [
            {
                type: ObjectId,
                ref: 'Category'
            }
        ]
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
    articleSchema.statics.validateObj = async (obj, config = {}) => {
        return articleJoi.validate(obj, config)
    }
    const documentModel = mongoose.model('Article', articleSchema)
    documentModel.syncIndexes()
    return documentModel

}

