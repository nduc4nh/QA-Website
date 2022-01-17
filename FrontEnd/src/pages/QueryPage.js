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
import Footer from '../components/Footer'
import Popup from '../components/Popup'
import MemberAccessWarning from '../components/MemberAccessWarning'

const QueryPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { search, kind } = useParams()
    const [queryContent, setQueryContent] = useState()
    const [questions, setQuestions] = useState()
    const [categories, setCategories] = useState()
    const [listLikes, setListLikes] = useState()
    const [warning, setWarning] = useState(false)

    console.log(search)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const user = useSelector((state) => state.auth)
    window.scrollTo(0, 0)

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
    else if (kind === "category") {
        axios
            .get(`${backend}category/${search}`)
            .then(res => {
                setQueryContent(res.data.title)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const getPostByTags = () => {
        axios
            .get(`${backend}article?tags=${search}&page=1`)
            .then(res => {
                let posts = res.data.data
                console.log(res.data.listLike)
                setListLikes(res.data.listLike)
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

    const getPostByCategory = () => {
        axios
            .get(`${backend}article?categories=${search}&page=1`)
            .then(res => {
                console.log(res.data)
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
        else if (kind === "category") {
            getPostByCategory()
        }
    }, [queryContent])
    const getReaction = (item) => {
        let reaction = listLikes.filter(react => react.articleId === item._id)
        if (reaction.length > 0) return reaction[0]
        return {
            like: [],
            dislike: []
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
                            {questions && (listLikes != undefined) && questions.map((item, i) => (getReaction(item) && (<QuestionCard question={item} reaction={getReaction(item)} user={user} warningFunc={setWarning} />)))}
                        </div>
                        <div className='content-right-side-home'>
                            s
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

export default QueryPage
