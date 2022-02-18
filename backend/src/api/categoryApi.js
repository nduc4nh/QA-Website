module.exports = (app, container) => {
    const { categoryController } = container.resolve('controller')
    const { checkAccessToken, checkRole } = container.resolve('middleware')
    app.get("/category", categoryController.getCategory)
    app.get("/category/article", checkAccessToken, categoryController.getArticle)
    app.get("/category/:id", checkAccessToken, categoryController.getCategoryById)
    app.put("/category/:id", checkAccessToken,checkRole, categoryController.updateCategory)
    app.delete("/category/:id", checkAccessToken,checkRole, categoryController.deleteCategory)
    app.post("/category", checkAccessToken,checkRole, categoryController.addCategory)
}
