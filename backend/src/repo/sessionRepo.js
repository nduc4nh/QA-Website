module.exports = container => {
    const { schemas } = container.resolve('models')
    const { Session } = schemas
    const addSession = (hash, userId, expireAt) => {
        const sess = new Session({ hash, userId, expireAt })
        return sess.save()
    }
    const updateSession = (id, sess) => {
        return Session.findByIdAndUpdate(id, sess, { useFindAndModify: false })
    }
    const updateSessionByCondition = (pipe, update) => {
        return Session.updateOne(pipe, { $set: update }, { upsert: true })
    }
    const removeSessionById = id => {
        return Session.findByIdAndRemove(id, { useFindAndModify: false })
    }
    const removeSession = (pipe) => {
        return Session.deleteMany(pipe)
    }
    const getSession = (pipe) => {
        return Session.find(pipe).sort({ _id: -1 })
    }
    return { addSession, removeSessionById, updateSession, updateSessionByCondition, removeSession, getSession }
}
