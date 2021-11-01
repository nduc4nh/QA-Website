module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { authorizationController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.post(`${basePath}/authorization`, authorizationController.authorization)
}
