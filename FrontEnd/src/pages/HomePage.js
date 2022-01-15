import React, { useEffect, useState } from 'react'
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

const HomePage = () => {
    const dispatch = useDispatch()
    const [questions, setQuestions] = useState()
    const [categories, setCategories] = useState()

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const user = useSelector((state) => state.auth)
    console.log(user, "check user");

    const getPost = () => {
        axios
            .get(`${backend}article?page=1`)
            .then(res => {
                console.log(res.data.data, "get all post")
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
                setQuestions(posts)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const getCategory = () => {
        axios
            .get(`${backend}category`)
            .then(res => {
                setCategories(res.data["data"])
            })
            .catch((e) => {
                console.log(e)
            })
    }
    useEffect(() => {
        getPost()
        getCategory()
    }, [])

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
    return (
        <div className='home'>
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
                        {questions.map((item) => (<QuestionCard question={item} />))}
                    </div>
                    <div className='content-right-side-home'>
                        s
                    </div>
                </div>
            </Container>}

            <Footer />

        </div>
    )
}

export default HomePage
