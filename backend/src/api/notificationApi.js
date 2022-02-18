module.exports = (app, container) => {
    const { notificationController } = container.resolve('controller')
    const { checkAccessToken } = container.resolve('middleware')
    app.get("/notification", notificationController.getNotification)
    app.get("/notification/:id" ,checkAccessToken, notificationController.getNotificationById)
    app.put("/notification/:id" ,checkAccessToken, notificationController.updateNotification)
    app.delete("/notification/:id" ,checkAccessToken, notificationController.deleteNotification)
    app.post("/notification" ,checkAccessToken, notificationController.addNotification)
}
