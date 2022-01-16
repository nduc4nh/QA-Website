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
import Popup from '../components/Popup'
import MemberAccessWarning from '../components/MemberAccessWarning'
const HomePage = () => {
    const dispatch = useDispatch()
    const [questions, setQuestions] = useState()
    const [categories, setCategories] = useState()
    const [listLikes, setListLikes] = useState()
    const [warning, setWarning] = useState(false)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const user = useSelector((state) => state.auth)
    console.log(user, "check user");

    const getPost = () => {
        axios
            .get(`${backend}article?page=1`)
            .then(res => {
                console.log(res.data, "get all post")
                console.log(res.data.listLike)
                setListLikes(res.data.listLike)
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
                        {questions && questions.map((item, i) => (<QuestionCard question={item} reaction={listLikes[i]} user={user} warningFunc = {setWarning}/>))}
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
