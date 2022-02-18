module.exports = (app, container) => {
    const { userController } = container.resolve('controller')
    const { checkAccessToken, checkRole } = container.resolve('middleware')
    app.get("/user", checkAccessToken, userController.getUser)
    app.get("/user/logout", userController.logout)
    app.post("/user/login", userController.login)
    app.get("/user/:id", checkAccessToken, userController.getUserById)

    app.put("/user/changepassword",checkAccessToken, userController.changePassword)
    app.put("/user/:id", checkAccessToken, userController.updateSelfInfo)
    app.delete("/user/:id", checkAccessToken, checkRole, userController.deleteUser)
    app.post("/register", userController.addUser)
}
