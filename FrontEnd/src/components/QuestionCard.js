import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import FlatListItem from './FlatListItem'
import './css/QuestionCard.css'
import InteractiveFooter from './InteractiveFooter'
import UserHeaderGroup from './UserHeaderGroup'
import { Link } from 'react-router-dom'
import { dataURLtoFile, truncate } from '../utils/StringProcessing'
import styled from 'styled-components'
import axios from 'axios'
import { imageEnpoints } from '../store/endPoints'


const QuestionCard = ({ question,reaction, user, warningFunc}) => {
    const trunc = truncate(question.content)
    const path = `/question?questionId=${question._id}`
    const [postImage, setPostImage] = useState()

    const getPostImage = () => {

        axios
            .get(`${imageEnpoints}image/post/get/${question._id}`)
            .then(res => {
                let imgbs4 = res.data.image["image"]
                if (!imgbs4) return;

                if (imgbs4 === "-1") return;
                console.log(imgbs4)
                setPostImage(URL.createObjectURL(
                    dataURLtoFile(imgbs4)
                ))
            })
    }

    useEffect(() => {
        getPostImage()
    }, [])


    return (
        <Card className="card-container">
            <div style={{ margin: 15 }}>
                <UserHeaderGroup user={question.user} otherInfo={question.date} />
            </div>
            <Card.Title>
                <div style={{ marginLeft: 15 }}>
                    <Link to={path} style={{ textDecoration: "none", color: "black" }}>{question.title}</Link>
                </div>
            </Card.Title>
            <Card.Body>
                <div style = {{maxWidth:"450px", marginLeft:"50px"}}>
                    {postImage && <img src={postImage} style={{ width: "100%"}} />}
                </div>
                <br></br>
                {trunc[0].slice(0, -10)}
                <span>{!trunc[1] ? trunc[0].slice(-10) :
                    (<span><span style={{
                        backgroundImage: "linear-gradient(to right, black, white 80%, white)",
                        WebkitTextFillColor: "transparent",
                        WebkitBackgroundClip: "text"
                    }}>
                        {trunc[0].slice(-10)}
                    </span>
                        <span>(<a style={{ textDecoration: "none" }} href={path}>more</a>)</span>
                    </span>
                    )
                }
                </span>
            </Card.Body>
            <div style={{ flex: 1 }}>
                <InteractiveFooter like={reaction.like} dislike={reaction.dislike} questionId={question._id} user ={user} warnFunc = {warningFunc}/>
            </div>
        </Card>
    )
}

export default QuestionCard
