import React from 'react'
import { BiUpvote, BiDownvote } from 'react-icons/bi'

import { FaRegCommentAlt } from 'react-icons/fa'
import './css/InteractiveFooter.css'
import { ButtonGroup, Button } from 'react-bootstrap'


const InteractiveFooter = () => {
    return (
        <div className="footer-container">
            <div className="footer-left-content">
                <div className="footer-btn-group">
                    <div className="vote">
                        <div className="footer-btn-upvote footer-btn-suggest">
                            <i className="far fa-thumbs-up footer-btn--icon"></i>
                            <span className="suggestions">
                                UpVote
                            </span>
                        </div>
                        <span className="number-vote">112</span>
                        <span className="box">|</span>
                    
                    
                        <div className="footer-btn-downvote footer-btn-suggest">
                            <i class="far fa-thumbs-down footer-btn--icon"></i>
                            <span className="suggestions">
                                DownVote
                            </span>
                        </div>
                    </div>

                    <div className="footer-btn-comment footer-btn-suggest">
                        <i class="far fa-comment-dots footer-btn--icon"></i>
                        <span className="suggestions">
                            Comment
                        </span>
                    </div>
                </div>
            </div>
            <div className="footer-right-content">
                <div className="footer-btn-group">
                    <div className="footer-btn-share footer-btn-suggest">
                        <i class="far fa-share-square footer-btn--icon"></i>
                        <span className="suggestions">
                            Share
                        </span>
                        <ul className="Action-share">
                            <li className="Action-share--gr">
                                <i className="fab fa-facebook Action-share--icon"></i>
                                <span class="Action-share--fb">Facebook</span>
                            </li>
                            <li className="Action-share--gr"> 
                                
                                <i class="fab fa-twitter Action-share--icon"></i>
                                <span class="Action-share--tw">Twitter</span>
                            </li>
                            
                            <li class="Action-share--cp Action-share--gr">Copy link</li>
                        
                        </ul>
                    </div>
                    <div className="footer-btn-more footer-btn-suggest">
                        <i className="fas fa-ellipsis-h footer-btn--icon"></i>
                        <span className="suggestions">
                            More
                        </span>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default InteractiveFooter