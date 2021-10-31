module.exports = (joi, mongoose, {joi2MongoSchema, serverHelper}) => {
    const {ObjectId} = mongoose.Types
    const categoryJoi = joi.object({
        title:joi.string().required(),
        describe: joi.string().allow('')
    })
    const userSchema = joi2MongoSchema(categoryJoi, {
    },{
        createdAt: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        }
    })
    userSchema.statics.validateObj = async (obj, config = {}) => {
        return categoryJoi.validate(obj, config)
    }
    const documentModel = mongoose.model('Category', userSchema)
    documentModel.syncIndexes()
    return documentModel

}

