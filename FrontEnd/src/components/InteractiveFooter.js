import React, { useState } from 'react'
import { BiUpvote, BiDownvote } from 'react-icons/bi'

import { FaRegCommentAlt } from 'react-icons/fa'
import './css/InteractiveFooter.css'
import { ButtonGroup, Button } from 'react-bootstrap'
import axios from 'axios'
import { backend } from '../store/endPoints'
import { lightPrimaryColor } from '../constant/color'

const InteractiveFooter = ({ like, dislike, user, questionId, warnFunc }) => {
    const [likes, setLikes] = useState(like)
    const [dislikes, setDislikes] = useState(dislike)

    const onHandleLike = () => {
        if (user._id === null) {
            warnFunc(true)
            return false
        }
        axios
            .put(`${backend}like/like/${questionId}`, {}, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            })
            .then(res => {
                if (likes.some((item) => (item._id === user._id))) setLikes(prev => prev.filter((item) => (item._id !== user._id)))
                else setLikes(prev => [...prev, user])
                setDislikes(prev => prev.filter((item) => (item._id !== user._id)))

                console.log(res, "like")
            })
            .then((e) => {
                console.log(e)
            })
    }

    const onHandleDislike = () => {
        if (user._id === null) {
            console.log(warnFunc)
            warnFunc(true)
            return false
        }

        axios
            .put(`${backend}like/dislike/${questionId}`, {}, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            })
            .then(res => {
                if (dislikes.some((item) => (item._id === user._id))) setDislikes(prev => prev.filter((item) => (item._id !== user._id)))
                else setDislikes(prev => [...prev, user])
                setLikes(prev => prev.filter((item) => (item._id !== user._id)))
                console.log(res, "dislike")
            })
            .then((e) => {
                console.log(e)
            })
    }

    const likeByMe = (like) => {
        if (user._id === null) {
            return false
        }
        return like.some(item => item._id === user._id)
    }
    const disLikeByMe = (dislike) => {
        if (user._id === null) {
            return false
        }
        return dislike.some(item => item._id === user._id)
    }
    return (
        <div className="footer-container">
            <div className="footer-left-content">
                <div className="footer-btn-group">
                    <div className="vote">

                        <div className="footer-btn-upvote footer-btn-suggest"
                            onClick={onHandleLike}
                            style={{
                                background: likeByMe(likes) ? lightPrimaryColor : ""
                            }}>
                            <span class="footer-btn-upvote__like footer-btn-upvote__like-liked">
                                <i className="fas fa-arrow-alt-circle-up footer-btn-upvote__like-no"></i>
                                <i className="fas fa-arrow-alt-circle-up footer-btn-upvote__like-yes"></i>
                            </span>

                            <span className="suggestions">
                                UpVote
                            </span>
                        </div>
                        <span className="number-vote">{likes.length}</span>
                        <span className="box">|</span>


                        <div className="footer-btn-downvote footer-btn-suggest"
                            onClick={onHandleDislike}
                            style={{
                                background: disLikeByMe(dislikes) ? lightPrimaryColor : ""
                            }}>
                            <i class="far fa-arrow-alt-circle-down footer-btn--icon"></i>
                            <span className="suggestions">
                                DownVote
                            </span>
                        </div>
                        <span className="number-vote">{dislikes.length}</span>
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