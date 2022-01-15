import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "*"
    }
});

let commentUser = []

const addUser = (commentSection, socketId) => {
    if (commentUser.some(comment => comment.userId === commentSection.userId)) {
        commentUser.forEach((item, i) => {
            if (item.userId === commentSection.userId)
                commentUser[i] = {
                    userId: commentSection.userId,
                    username: commentSection.username,
                    avatar: commentSection.avatar,
                    socketId: socketId,
                    postId: commentSection.postId
                }
                
        })
        return
    }

    commentUser = [...commentUser, {
        userId: commentSection.userId,
        username: commentSection.username,
        avatar: commentSection.avatar,
        socketId: socketId,
        postId: commentSection.postId,
    }]
}

const removeUser = (socketId) => {
    commentUser = commentUser.filter(user => user.socketId !== socketId)
}

const getUser = (socketId) => {
    return commentUser.find(user => user.socketId === socketId)
}

const getUserById = (userId) => {
    return commentUser.find(user => user.userId === userId)
}

const getUserByPost = (postId) => {
    return commentUser.filter(comment => comment.postId === postId)
}

io.on("connection", (socket) => {
    socket.on("newCommentPost", (commentSection) => {
        console.log(socket.id + " connected")
        addUser(commentSection, socket.id)
        console.log(commentUser)
    })


    socket.on("disconnect", () => {
        removeUser(socket.id)
        console.log("" + socket.id + " disconected")
    })
    socket.on("pushComment", (comment) => {

        let user = getUser(socket.id)
        console.log(comment, commentUser, socket.id)
        let commenter = getUserById(comment.commenterId)
        let participants = getUserByPost(user.postId)
        console.log(participants)
        participants.forEach(participant => {
            let pushCmt = {
                username: commenter.username,
                avatar: commenter.avatar,
                message: comment.message,
                order: comment.order
            }
            console.log(pushCmt)
            io.to(participant.socketId).emit("receiveComment", pushCmt)
        })
        console.log("post comment",)

    })

    socket.on("notifyUser", (notification) => {
        console.log(notification)
        let sender = getUserById(notification.senderId)
        let receiver = getUserById(notification.receiverId)
        let msg = {
            senderUsername: sender.userName,
            senderAvatar: sender.avatar,
            postTitle: notification.title,
            postId: receiver.postId
        }
        io.to(receiver.socketId).emit("receiveNotification", msg)
        console.log("notify")

    })
});

io.listen(5001);