module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { commentController } = container.resolve('controller')
    const { checkAccessToken } = container.resolve('middleware')
    const { basePath } = serverSettings
    app.get("/comment", checkAccessToken, commentController.getComment)
    app.get("/comment/:id", checkAccessToken, commentController.getCommentById)
    app.put("/comment/:id", checkAccessToken, commentController.updateComment)
    app.delete("/comment/:id", checkAccessToken, commentController.deleteComment)
    app.post("/comment", checkAccessToken, commentController.addComment)
}
