import React, { useEffect, useRef, useState } from 'react'
import { Container, Dropdown, Button, ButtonGroup, Image, Card } from 'react-bootstrap'
import './css/Home.css'
import './css/QuestionPage.css'
import CommentBar from '../components/CommentBar'
import CommentBox from '../components/CommentBox'

import { BsPencilFill } from 'react-icons/bs'
import Navigationbar2 from '../components/Navigationbar2'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../store/action/authActions'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Tag from '../components/Tag'
import { io } from 'socket.io-client'
import { backend, socketServer } from "../store/endPoints"
import CustomButton from '../components/CustomButton'
import Popup from '../components/Popup'
import AddQuestionForm from '../components/AddQuestionForm'
import MemberAccessWarning from '../components/MemberAccessWarning'
import { useNavigate } from 'react-router'
import { imageEnpoints } from '../store/endPoints'
import { dataURLtoFile, checkSlang} from '../utils/StringProcessing'
import Footer from '../components/Footer'
import { lightPrimaryColor, primaryColor } from '../constant/color'
import { SLANG } from '../constant/slang'

const useFocus = () => {

    const htmlElRef = useRef(null)
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setFocus]
}

const QuestionPage = props => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [warning, setWarning] = useState(false)
    const [question, setQuestion] = useState()
    const [tags, setTags] = useState([])
    const [socket, setSocket] = useState(null)
    const [comment, setComment] = useState([])
    const [edit, setEdit] = useState(false)
    const [poster, setPoster] = useState()
    const [postImage, setPostImage] = useState()
    const [searchParams, setSearchParams] = useSearchParams()
    const questionId = searchParams.get("questionId")
    const [category, setCategory] = useState()

    const [dislikes, setDislikes] = useState(0)
    const [likes, setLikes] = useState(0)
    const [currentlyLike, setCurrentlyLike] = useState(0)

    const getPostImage = () => {

        axios
            .get(`${imageEnpoints}image/post/get/${questionId}`)
            .then(res => {
                let imgbs4 = res.data.image["image"]
                console.log(res)
                if (!imgbs4) return;

                if (imgbs4 === "-1") return;
                setPostImage(URL.createObjectURL(
                    dataURLtoFile(imgbs4)
                ))
            })
            .catch((e) => {
                console.log(e)
            })

    }
    window.scrollTo(0, 0)
    useEffect(() => {
        setSocket(io(socketServer))
    }, [])

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const user = useSelector((state) => state.auth)
    console.log(user, "check user");

    const [inputRef, setInputFocus] = useFocus()
    const questionTmp = {
        title: "Question title",
        content: "Question content, question content",
        poster: {
            name: "poster",
            avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",

        },
        date: "October 31"
    }

    console.log(questionId)

    useEffect(() => {

        axios
            .get(backend + "article/comments/" + questionId)
            .then(res => {
                console.log(res.data);
                console.log(res, "checklikes")
                let questionRes = res.data[0]
                console.log(questionRes, "123")
                let date = new Date(questionRes.createdAt * 1000)

                let newQuestion = {
                    ...question,
                    _id: questionRes._id,
                    title: questionRes.title,
                    content: questionRes.content,
                    date: date.toLocaleString('en-us', { day: 'numeric', month: 'short' }),
                    poster: {
                        name: "poster",
                        avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png"
                    },
                    comments: questionRes.comments,
                    like: 0,
                    dislike: 0,
                    tags: questionRes.tags
                }

                setLikes(questionRes.like)
                setDislikes(questionRes.dislike)
                if (questionRes.like.some((item) => item._id === user._id)) setCurrentlyLike(1)
                if (questionRes.dislike.some((item) => item._id === user._id)) setCurrentlyLike(-1)

                axios
                    .get(backend + "user/" + questionRes.createdBy,{
                        headers:{
                            "x-access-token":localStorage.getItem("token")
                        }
                    })
                    .then(response => {
                        let poster = response.data
                        setPoster({
                            _id: poster._id,
                            name: poster.username,
                            avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png"
                        })
                    })
                let apis = []
                newQuestion.tags.forEach(tag => {
                    apis = [...apis, axios.get(backend + "tag/" + tag)]
                });
                axios
                    .all(apis)
                    .then(axios.spread((...responses) => {
                        let tmpTags = []
                        responses.forEach((response, idx) => {
                            tmpTags = [...tmpTags, response.data.name]
                        })
                        setTags(tmpTags)
                    }))
                console.log(newQuestion, "load question")
                axios
                    .get(`${backend}category/${questionRes.categories[0]}`)
                    .then(res => {
                        setCategory(res.data)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
                setQuestion(newQuestion)
            })
    }, [edit])

    useEffect(() => {
        getPostImage()
    }, [question])

    console.log(poster, ">>>>")

    useEffect(() => {
        if (socket) {
            socket.emit("newCommentPost", {
                userId: user._id,
                username: user.username,
                avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",
                postId: questionId

            })
        }
    }, [socket])


    const onHandlePushComment = (cmt) => {
        if (user._id == null) {
            setWarning(true)
            return
        }
        if (checkSlang(cmt, SLANG)) return
        
        let postTime = Math.floor(new Date().getTime() / 1000.0)
        socket.emit("pushComment", {
            message: cmt,
            order: postTime,
            commenterId: user._id
        })

        axios.post(backend + "comment", {
            articleId: questionId,
            content: cmt
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res =>
                console.log(res)
            )
            .catch((e) => {
                console.log(e)
            })

        socket.emit("notifyUser", {
            senderId: user._id,
            receiverId: poster._id,
            title: question.title
        })
    }

    const navigatePostWithTag = (tagId) => {
        navigate(`/questions?search='${tagId}'&kind='tags'`)
    }

    const onHandleLike = () => {
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
        return like.some(item => item._id === user._id)
    }
    const disLikeByMe = (dislike) => {
        return dislike.some(item => item._id === user._id)
    }



    return (
        <div style = {{position:"relative"}}>
            <div className='home'>
                {edit &&
                    <Popup handleClose={() => setEdit(false)} title={"Update Question"} >
                        <div style={{ width: "100%", height: "100%", paddingRight: "15px" }}>
                            <AddQuestionForm onClose={setEdit} edit={true} postTitle={question.title} content={question.content} tags={tags} category={category} idx={question._id} />
                        </div>
                    </Popup>}
                {warning &&
                    <Popup handleClose={() => setWarning(false)} title={"Member Access Requirement"} >
                        <MemberAccessWarning></MemberAccessWarning>
                    </Popup>}

                <div className='header-home'>
                    <Navigationbar2 user={user} />
                </div>
                <Container style={{ paddingLeft: "100px", paddingRight: "100px", paddingTop: "50px" }}>
                    {question && (<div className='content-home'>
                        <div className='content-main-home'>
                            <div className="content-header-container" style={{ minHeight: 100 }}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div style={{ fontSize: 40, fontWeight: "bold" }}>
                                        {question.title}
                                    </div>

                                    {(poster && poster._id === user._id) ?
                                        <div style={{ margin: "5px" }}>
                                            <CustomButton border={"20px"} onClick={() => setEdit(!edit)}>
                                                <BsPencilFill color="grey" />
                                            </CustomButton>
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                                <div className="title-footer" style={{ alignSelf: "end" }}>

                                    <div className="btn-answer">
                                        <i class="far fa-edit btn-answer-icon"></i>
                                        Answer
                                    </div>
                                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>

                                        <div className="vote">
                                            {likes.length}
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
                                            {dislikes.length}
                                            <div className="footer-btn-downvote footer-btn-suggest"
                                                onClick={onHandleDislike}
                                                style={{
                                                    background: disLikeByMe(dislikes) ? lightPrimaryColor : ""
                                                }}
                                            >
                                                <i class="far fa-arrow-alt-circle-down footer-btn--icon"></i>
                                                <span className="suggestions">
                                                    DownVote
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: "10px" }}>
                                {tags && tags.map((tag, idx) =>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Tag label={tag} removable={false} tagId={question.tags[idx]} />
                                    </div>
                                )}
                            </div>
                            <Dropdown.Divider />

                            <div className="content-body-container">
                                <div className="content-question-container">
                                    <div className="poster-container">
                                        <Image src={poster && poster.avatar} roundedCircle />
                                        <div className="poster-info-holder">
                                            <div className="poster-name-holder">
                                                <div style={{ font: "bold", fontSize: 20 }}>
                                                    {poster && poster.name}
                                                </div>
                                            </div>
                                            <div className="poster-date-holder">
                                                <div style={{ fontSize: 15, color: "grey" }}>
                                                    {question.date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Container>
                                        {postImage && <img src={postImage} style={{ maxHeight: "600px", maxWidth: "700px" }} />}
                                        <Card.Body>
                                            {question.content}
                                        </Card.Body>
                                    </Container>
                                </div>
                                <Dropdown.Divider />
                                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                    {'' + question.comments.length + (question.comments.length <= 1 ? " Answer" : " Answers")}
                                </div>
                                <Dropdown.Divider />
                                <div className="content-answer-container">
                                    {poster && <CommentBar inputRef={inputRef} submit={onHandlePushComment} />}
                                    <CommentBox comments={question.comments} socket={socket} />
                                </div>
                            </div>
                        </div>
                        <div className='content-right-side-home' style={{ marginTop: "100px" }}>
                        </div>
                    </div>)}
                </Container>

            </div>
            <Footer />
        </div>
    )
}

export default QuestionPage
