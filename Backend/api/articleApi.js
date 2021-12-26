module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { articleController } = container.resolve('controller')
    const { verifyAccessToken } = container.resolve('middleware')
    const { basePath } = serverSettings
    app.get(`${basePath}/article`, verifyAccessToken, articleController.getArticle)
    app.get(`${basePath}/article/:id`, verifyAccessToken, articleController.getArticleById)
    app.put(`${basePath}/article/:id`, verifyAccessToken, articleController.updateArticle)
    app.delete(`${basePath}/article/:id`, verifyAccessToken, articleController.deleteArticle)
    app.post(`${basePath}/article`, verifyAccessToken, articleController.addArticle)
}
