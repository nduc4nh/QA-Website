module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { tagController } = container.resolve('controller')
    const { checkAccessToken } = container.resolve('middleware')
    app.get("/tag", tagController.getTag)
    app.get("/tag/list", checkAccessToken, tagController.tagList)
    app.get("/tag/:id", tagController.getTagById)
    app.put("/tag/:id", checkAccessToken, tagController.updateTag)
    app.delete("/tag/:id", checkAccessToken, tagController.deleteTag)
    app.post("/tag", checkAccessToken, tagController.addTags)
}
