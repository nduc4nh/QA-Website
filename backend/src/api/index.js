module.exports = (app, container) => {
    require('./userApi')(app, container)
    require('./categoryApi')(app, container)
    require('./articleApi')(app, container)
    require('./commentApi')(app, container)
    require('./authorizationApi')(app, container)
    require('./tagApi')(app, container)
    require('./uploadApi')(app, container)
    require('./notificationApi')(app, container)
    require('./likeApi')(app, container)

}
