import React, { useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import CommentCard from './CommentCard'
const CommentBox = ({ comments, socket }) => {
    console.log(comments)
    const baseComment = comments.map((comment) => ({
        username: "" + comment.userComment[0].username,
        date: new Date(comment.createdAt * 1000).toLocaleString(),
        passage: comment.content,
        upvotes: comment.like,
        downvotes: comment.dislike,
        avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",
        order: comment.createdAt
    }))
    const [finalComment, setFinalComment] = useState(baseComment)
    useEffect(() => {
        console.log(socket)
        socket.on("receiveComment", (comment) => {
            let tmpComment = {
                username: "" + comment.username,
                date: new Date(comment.order * 1000).toLocaleString(),
                passage: comment.message,
                upvotes: 0,
                downvotes: 0,
                avatar: comment.avatar,
                order: comment.order
            }
            console.log(tmpComment, "check")
            setFinalComment((prev) => [...prev,tmpComment])
        })
        
    }, [socket])    
    console.log(finalComment)


    return (
        <div>
            {finalComment.sort((a,b) => a.order - b.order).map((item) => (
                <div>
                    <CommentCard comment={item} />
                    <Dropdown.Divider />
                </div>
            ))}
        </div>
    )
}

export default CommentBox
