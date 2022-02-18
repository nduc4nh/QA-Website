const repo = (container) => {
    const userRepo = require('./userRepo')(container)
    const categoryRepo = require('./categoryRepo')(container)
    const articleRepo = require('./articleRepo')(container)
    const commentRepo = require('./commentRepo')(container)
    const sessionRepo = require('./sessionRepo')(container)
    const tagRepo = require('./tagRepo')(container)
    const notificationRepo = require('./notificationRepo')(container)
    const likeRepo = require('./likeRepo')(container)
    return {
        userRepo,categoryRepo,articleRepo,commentRepo, sessionRepo, tagRepo,notificationRepo,likeRepo
    }
}
const connect = (container) => {
    const dbPool = container.resolve('db')
    if (!dbPool) throw new Error('Connect DB failed')
    return repo(container)
}

module.exports = { connect }
