module.exports = (joi, mongoose) => {
    const sessionSchema = mongoose.Schema({
        hash: { type: String, index: true },
        createdAt: { type: Number, default: Date.now },
        expireAt: { type: Number },
        userId: { type: String, index: true }
    })
    return mongoose.model('session', sessionSchema)
}
