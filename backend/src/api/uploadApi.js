module.exports = (app, container) => {
    const { serverHelper, serverSettings } = container.resolve('config')
    const { uploadController } = container.resolve('controller')
    app.post('/upload', serverHelper.upload.single('file'), uploadController.uploadFile)
}
