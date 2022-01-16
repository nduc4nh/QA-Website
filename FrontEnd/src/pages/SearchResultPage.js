import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Footer from '../components/Footer'
import './css/Home.css'
import axios from 'axios'
import Navigationbar2 from '../components/Navigationbar2'
import { backend } from '../store/endPoints'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { loadUser } from '../store/action/authActions'
import CustomFlatList from '../components/CustomFlatList'
import { Container } from 'react-bootstrap'
import SearchResultBox from '../components/SearchResultBox'
import IntroSearchDefault from '../components/IntroSearchDefault'
import { primaryGrey } from '../constant/color'
const SearchResultPage = () => {
    const dispatch = useDispatch()
    const [results, setResults] = useState(["", ""])
    const [categories, setCategories] = useState()
    
    
    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const user = useSelector((state) => state.auth)
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("find")
    
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
    // const getResult = () =>{
    //     axios
    //     .get(`${backend}`)
    // }
    const getSearchByTag = () => {
        axios
            .get(`${backend}tag?slug=${query}`)
            .then(res => {
                if (res.data.data.length > 0) {
                    axios
                        .get(`${backend}article?tags=${res.data.data[0]._id}`)
                        .then(res => {
                            console.log(res.data,query, "tag")
                            let tmp = [...results]
                            tmp[0] = res.data.data
                            setResults(tmp)
                        })
                        .catch((e) => {
                            console.log(e)
                        })
                }
            })
    }

    const getSearchByTitle = () => {
        axios
            .get(`${backend}article?slug=${query}`)
            .then(res => {
                console.log(res.data,query, "Title")
                let tmp = [...results]
                tmp[1] = res.data.data
                setResults(tmp)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const getAll = () =>{  
        getSearchByTag()
        getSearchByTitle()
        getCategory()
    }
    useEffect(() => {
        getAll()
    }, [])



    const transform = (resultsArray) => {
        console.log(resultsArray)
        let res = []
        resultsArray.forEach((e, i) => {
            res = res.concat(e)
        })

        let finalRes = []
        res.forEach((e, i) => {
            if (!finalRes.some((item) => (e._id === item._id))) {
                let tmpE = { ...e, content: e.title }
                if (tmpE.content) finalRes = [...finalRes, tmpE]
            }

        })
        console.log(finalRes, "tranformed")

        return finalRes
    }

    return (
        <div className='home'>
            <div className='header-home'>
                <Navigationbar2 user={user} />
            </div>
            <Container style={{ paddingLeft: "100px", paddingRight: "100px", minHeight: "500px" }}>
                <div className='content-home'>
                    <div className='content-left-side-home'>
                        {categories &&
                            <CustomFlatList
                                items={categories.map((item) => item.title)}
                                controlVar={categories.map((item) => item._id)}
                            />}
                    </div>
                    <div className='content-main-home'>
                        <div style={{ paddingTop: "50px" }}>
                            <IntroSearchDefault kind={"keyword"} query={query} />
                            {results[0].length >= 0 ?<SearchResultBox size="50%" items={results[0]} label={"Related questions"} /> : <></>}
                            {results[1].length >= 0 ? <SearchResultBox size="50%" items={results[1]} label={"More"} /> : <></>}
                            <div style={{
                                marginTop: "30px",
                                marginBottom: "30px",
                                textAlign:"end",
                                fontStyle:"italic",
                                color:`${primaryGrey}`
                            }}>
                                {`Number of results: ${transform(results).length}`}
                            </div>
                        </div>
                    </div>
                    <div className='content-right-side-home'>
                        s
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    )
}

export default SearchResultPage
