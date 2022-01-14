import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../store/action/authActions'
import { Container } from 'react-bootstrap'
import './css/Home.css'
import CustomFlatList from '../components/CustomFlatList'
import QuestionCard from '../components/QuestionCard'
import Navigationbar2 from '../components/Navigationbar2'
import IntroCategory from '../components/IntroCategory'
import IntroSearchDefault from '../components/IntroSearchDefault'
import { useSearchParams } from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios'
import { backend } from '../store/endPoints'
import { getOffsetTimeString } from '../utils/TimeConverter'

const QueryPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { search, kind } = useParams()
    const [queryContent, setQueryContent] = useState()
    const [questions, setQuestions] = useState()
    const [categories, setCategories] = useState()

    console.log(search)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    if (kind === "tag") {
        axios
            .get(`${backend}tag/${search}`)
            .then(res => {
                setQueryContent(res.data.name)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    else if (kind === "category"){
        axios
            .get(`${backend}category/${search}`)
            .then(res =>{
                setQueryContent(res.data.title)
            })
            .catch((e) =>{
                console.log(e)
            })
    }

    const getPostByTags = () => {
        axios
            .get(`${backend}article?tags=${search}&page=1`)
            .then(res => {
                let posts = res.data.data
                posts = posts.map((post) => {
                    let tmpost = { ...post }
                    tmpost.user = {
                        name: post.createdBy.username,
                        avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png"
                    }
                    tmpost.date = getOffsetTimeString(post.createdAt)
                    return tmpost
                })
                console.log(posts, "transformed")
                setQuestions(posts)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const getPostByCategory  = () => {
        axios
            .get(`${backend}article?categories=${search}&page=1`)
            .then(res => {
                let posts = res.data.data
                posts = posts.map((post) => {
                    let tmpost = { ...post }
                    tmpost.user = {
                        name: post.createdBy.username,
                        avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png"
                    }
                    tmpost.date = getOffsetTimeString(post.createdAt)
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
        getCategory()
        if (kind === "tag") {
            getPostByTags()
        }
        else if (kind === "category")
        {
            getPostByCategory()
        }
    }, [queryContent])

    const user = useSelector((state) => state.auth)

    return (
        <div className='home'>
            <div className='header-home'>
                <Navigationbar2 user={user} />
            </div>
            <Container style={{ paddingLeft: "100px", paddingRight: "100px" }}>
                <div className='content-home'>
                    <div className='content-left-side-home'>
                        {categories &&
                            <CustomFlatList
                                items={categories.map((item) => item.title)}
                                controlVar={categories.map((item) => item._id)}
                            />}
                    </div>
                    <div className='content-main-home'>
                        <IntroSearchDefault query={queryContent} kind={kind} />
                        {questions && questions.map((item) => (<QuestionCard question={item} />))}
                    </div>
                    <div className='content-right-side-home'>
                        s
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default QueryPage
