module.exports = (app, container) => {
    const { likeController } = container.resolve('controller')
    const { checkAccessToken } = container.resolve('middleware')
    app.get("/like", likeController.getLike)
    app.get("/like/:id" ,checkAccessToken, likeController.getLikeById)
    app.put("/like/like/:id" ,checkAccessToken, likeController.updateLike)
    app.put("/like/dislike/:id" ,checkAccessToken, likeController.updateDislike)
    app.delete("/like/:id" ,checkAccessToken, likeController.deleteLike)
    app.post("/like" ,checkAccessToken, likeController.addLike)
}
