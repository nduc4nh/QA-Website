const repo = (container) => {
    const userRepo = require('./userRepo')(container)
    const categoryRepo = require('./categoryRepo')(container)
    const articleRepo = require('./articleRepo')(container)
    const commentRepo = require('./commentRepo')(container)
    const sessionRepo = require('./sessionRepo')(container)
    return {
        userRepo,categoryRepo,articleRepo,commentRepo, sessionRepo
    }
}
const connect = (container) => {
    const dbPool = container.resolve('db')
    if (!dbPool) throw new Error('Connect DB failed')
    return repo(container)
}

module.exports = { connect }
