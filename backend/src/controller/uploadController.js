module.exports = (container) => {
    const uploadFile = async (req, res) => {
        try {
            console.log(req.file)
            const path = req.file.pathCustom
            const fileName = req.file.filename
            res.status(200).json({
                path,
                fileName
            })
        } catch (e) {
            console.log(e)
        }
    }
    return { uploadFile }
}
