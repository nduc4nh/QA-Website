import React from 'react'
import { BiUpvote, BiDownvote } from 'react-icons/bi'
import { FaRegCommentAlt } from 'react-icons/fa'
import './css/InteractiveFooter.css'
import { ButtonGroup, Button } from 'react-bootstrap'

const InteractiveFooter = () => {
    return (
        <div className='footer-container'>
            <div className="footer-left-content">
                <ButtonGroup bsPrefix='footer-btn-group'>
                    <Button bsPrefix='footer-btn-upvote'><BiUpvote /></Button>
                    <Button bsPrefix='footer-btn-downvote'><BiDownvote /></Button>
                </ButtonGroup>
            </div>
            <div className="footer-right-content">
                <Button bsPrefix='footer-btn-comment'><FaRegCommentAlt /></Button>
            </div>
        </div>
    )
}

export default InteractiveFooter
