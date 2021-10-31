module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { userController } = container.resolve('controller')
    const { verifyAccessToken } = container.resolve('middleware')
    const { basePath } = serverSettings
    app.get(`${basePath}/user`, verifyAccessToken, userController.getUser)
    app.get(`${basePath}/user/logout`, userController.logout)
    app.post(`${basePath}/user/login`, userController.login)
    app.get(`${basePath}/user/:id`, verifyAccessToken, userController.getUserById)

    app.put(`${basePath}/user/changePassword`, userController.changePassword)
    app.put(`${basePath}/user/:id`, verifyAccessToken, userController.updateUser)
    app.delete(`${basePath}/user/:id`, verifyAccessToken, userController.deleteUser)
    app.post(`${basePath}/user`, verifyAccessToken, userController.addUser)
}
