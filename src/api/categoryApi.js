module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { categoryController } = container.resolve('controller')
    const { verifyAccessToken } = container.resolve('middleware')
    const { basePath } = serverSettings
    app.get(`${basePath}/category`, verifyAccessToken, categoryController.getCategory)
    app.get(`${basePath}/category/:id`, verifyAccessToken, categoryController.getCategoryById)
    app.put(`${basePath}/category/:id`, verifyAccessToken, categoryController.updateCategory)
    app.delete(`${basePath}/category/:id`, verifyAccessToken, categoryController.deleteCategory)
    app.post(`${basePath}/category`, verifyAccessToken, categoryController.addCategory)
}
