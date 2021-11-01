module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { commentController } = container.resolve('controller')
    const { verifyAccessToken } = container.resolve('middleware')
    const { basePath } = serverSettings
    app.get(`${basePath}/comment`, verifyAccessToken, commentController.getComment)
    app.get(`${basePath}/comment/:id`, verifyAccessToken, commentController.getCommentById)
    app.put(`${basePath}/comment/:id`, verifyAccessToken, commentController.updateComment)
    app.delete(`${basePath}/comment/:id`, verifyAccessToken, commentController.deleteComment)
    app.post(`${basePath}/comment`, verifyAccessToken, commentController.addComment)
}
