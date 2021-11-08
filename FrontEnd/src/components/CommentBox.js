import React from 'react'
import { Dropdown } from 'react-bootstrap'
import CommenCard from './CommenCard'
const CommentBox = ({ comments }) => {
    const commentsTmp = [
        {
            username: "A",
            date: "Month Date",
            passage: "this is a comment this is a comment this is a comment this is a comment",
            upvotes: "100",
            downvotes: "0",
            avatar:"http://ativn.edu.vn/wp-content/uploads/2018/03/user.png"
        },
        {
            username: "B",
            date: "Month Date",
            passage: "this is a comment",
            upvotes: "100",
            downvotes: "0",
            avatar:"http://ativn.edu.vn/wp-content/uploads/2018/03/user.png"
        },
        {
            username: "C",
            date: "Month Date",
            passage: "this is a comment this is a comment this is a comment",
            upvotes: "100",
            downvotes: "0",
            avatar:"http://ativn.edu.vn/wp-content/uploads/2018/03/user.png"
        },
        {
            username: "D",
            date: "Month Date",
            passage: "this is a comment this is a comment this is a comment this is a comment",
            upvotes: "100",
            downvotes: "0",
            avatar:"http://ativn.edu.vn/wp-content/uploads/2018/03/user.png"
        },
    ]
    return (
        <div>
            {commentsTmp.map((item) => (
                <div>
                    <CommenCard comment={item} />
                    <Dropdown.Divider/>
                </div>
            ))}
        </div>
    )
}

export default CommentBox
