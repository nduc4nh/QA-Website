module.exports = (app, container) => {
    const { articleController } = container.resolve('controller')
    const { checkAccessToken } = container.resolve('middleware')
    app.get("/article", articleController.getArticle)
    app.get("/article/comments/:id", articleController.getArticleAndComment)
    app.get("/article/:id" ,checkAccessToken, articleController.getArticleById)
    app.put("/article/:id" ,checkAccessToken, articleController.updateArticle)
    app.delete("/article/:id" ,checkAccessToken, articleController.deleteArticle)
    app.post("/article" ,checkAccessToken, articleController.addArticle)
}
