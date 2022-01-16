import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../store/action/authActions'
import NavigationBar from '../components/NavigationBar'
import { Container } from 'react-bootstrap'
import './css/Home.css'
import CustomFlatList from '../components/CustomFlatList'
import QuestionCard from '../components/QuestionCard'
import Navigationbar2 from '../components/Navigationbar2'
import axios from 'axios'
import { backend } from "../store/endPoints"
import { getOffsetTimeString } from '../utils/TimeConverter'
import Footer from '../components/Footer'
import Popup from '../components/Popup'
import MemberAccessWarning from '../components/MemberAccessWarning'
import { useSearchParams } from 'react-router-dom'
import { primaryColor } from '../constant/color'

const HomePage = () => {
    const dispatch = useDispatch()
    const [questions, setQuestions] = useState([])
    const [categories, setCategories] = useState()
    const [listLikes, setListLikes] = useState([])
    const [warning, setWarning] = useState(false)

    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const paramPage = parseInt(searchParams.get("page"))
    const [page, setPage] = useState(1)

    const observer = useRef()

    const callBack = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            console.log(entries, "asd")
            if (entries[0].isIntersecting && hasMore) {

                setPage(prev => prev + 1)

            }
        })
        if (node) observer.current.observe(node)
    }, [hasMore, loading])


    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
    useEffect(() => {

        window.scrollTo(0, 0)
        window.onbeforeunload = function () {
            setPage(1)
            return true;
        };

        return () => {
            window.onbeforeunload = null;
        };
    }, []);

    const user = useSelector((state) => state.auth)
    // console.log(user, "check user");

    const getPost = () => {
        setLoading(true)
        axios
                .get(`${backend}article?page=${page}`)
                .then(res => {
                    console.log(res.data, "get all post")
                    console.log(res.data.listLike)
                    setHasMore(res.data.data.length > 0)
                    let tmpListlike = listLikes.concat(res.data.listLike)
                    setListLikes(tmpListlike)
                    let posts = res.data.data
                    posts = posts.map((post) => {
                        let tmpost = { ...post }
                        tmpost.user = {
                            name: post.createdBy.username,
                            avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png"
                        }
                        tmpost.date = getOffsetTimeString(post.createdAt)
                        console.log(post.createdAt)
                        return tmpost
                    })
                    console.log(posts, "transformed")
                    let tmpost = questions.concat(posts)
                    setQuestions(tmpost)
                    setLoading(false)
                })
                .catch((e) => {
                    console.log(e)
                })
    }

    const getCategory = () => {
        setLoading(true)
        axios
            .get(`${backend}category`)
            .then(res => {
                setCategories(res.data["data"])
            })
            .catch((e) => {
                console.log(e)
                setLoading(false)
            })
    }
    useEffect(() => {


        getPost()
        getCategory()


    }, [page])

    // const questions = [
    //     {
    //         title: "Question title",
    //         content: "Question content, question content",
    //         user: {
    //             name: "poster",
    //             avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",

    //         },
    //         date: "October 31"
    //     },
    //     {
    //         title: "Question title",
    //         content: "Question content, question c, question content, question content",
    //         user: {
    //             name: "poster",
    //             avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",

    //         },
    //         date: "October 31"
    //     },
    //     {
    //         title: "Question title",
    //         content: "Question content, question content",
    //         user: {
    //             name: "poster",
    //             avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",

    //         },
    //         date: "October 31"
    //     },
    //     {
    //         title: "Question title",
    //         content: "Question content, question content",
    //         user: {
    //             name: "poster",
    //             avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",

    //         },
    //         date: "October 31"
    //     },
    //     {
    //         title: "Question title",
    //         content: "Question content, question content",
    //         user: {
    //             name: "poster",
    //             avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",

    //         },
    //         date: "October 31"
    //     }
    // ]

    const getReaction = (item) => {
        let reaction = listLikes.filter(react => react.articleId === item._id)
        if (reaction.length > 0) return reaction[0]
        return {
            like: [],
            dislike: []
        }
    }

    const getQuestionCard = (item, i) => {
        {
            if (i === questions.length - 1) return (<div ref={callBack}><QuestionCard question={item} reaction={getReaction(item)} user={user} warningFunc={setWarning} /></div>)
            else return (<QuestionCard question={item} reaction={getReaction(item)} user={user} warningFunc={setWarning} />)
        }
    }

    return (
        <div style={{ position: "relative" }}>
            <div className='home'>
                {warning &&
                    <Popup handleClose={() => setWarning(false)} title={"Member Access Requirement"} >
                        <MemberAccessWarning></MemberAccessWarning>
                    </Popup>}
                <div className='header-home'>
                    <Navigationbar2 user={user} />
                </div>
                {questions && <Container style={{ paddingLeft: "100px", paddingRight: "100px" }}>
                    <div className='content-home'>
                        <div className='content-left-side-home'>
                            {categories &&
                                <CustomFlatList
                                    items={categories.map((item) => item.title)}
                                    controlVar={categories.map((item) => item._id)}
                                />}
                        </div>
                        <div className='content-main-home'>
                            {console.log(user, "testst")}
                            {questions && questions.map((item, i) => (getQuestionCard(item, i)))}
                            <div style={{
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                marginTop:"100px",
                                color:primaryColor,
                                fontWeight:"bold",
                                fontSize:"1.1rem"
                            }}>{loading ? "Fetching questions.." : ""}</div>
                        </div>
                        <div className='content-right-side-home'>
                            s
                        </div>
                    </div>
                </Container>}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default HomePage
