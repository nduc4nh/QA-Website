import React from 'react'
import './css/CommentCard.css'
import InteractiveFooter from './InteractiveFooter'
import { Card } from 'react-bootstrap'
import { BiUpvote, BiDownvote } from 'react-icons/bi'   
import { ButtonGroup, Button } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'


const CommentCard = ({ username, date, passage, upvotes, downvotes, comment }) => {
    return (
        <div className="comment-container">
            <div className="avatar-container">
                <Image src={comment.avatar} width="40" height="40" roundedCircle/>
            </div>
            <div className="content-container">
                <div className="content-header">
                    <Card.Title>{comment.username}</Card.Title>
                    <div style={{ paddingLeft: 5, paddingTop:10, fontSize: 5, color: "grey" }}>
                        {" \u2B24 "}
                    </div>
                    <div style={{ paddingLeft: 5, color: "grey" }}>
                        {comment.date}
                    </div>
                </div>
                <div className="content-body">
                        <Card.Text>
                            {comment.passage}
                        </Card.Text>
                    
                </div>
                <div className="content-footer">
                    <ButtonGroup bsPrefix='footer-btn-group'>
                        <Button bsPrefix='footer-btn-upvote'><BiUpvote />{comment.upvotes}</Button>
                        <Button bsPrefix='footer-btn-downvote'><BiDownvote />{comment.downvotes}</Button>
                    </ButtonGroup>
                </div>
            </div>

        </div>
    )
}

export default CommentCard
