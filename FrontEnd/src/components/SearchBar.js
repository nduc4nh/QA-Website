import React, { useState } from 'react'
import './css/SearchBar.css'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import Dropdown from './Dropdown';
import axios from 'axios';
import { getSearch } from '../store/action/searchAction';
import { backend } from '../store/endPoints';
import { useNavigate } from 'react-router';

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    outline: none;
    border:none;
    font-size: 21px;
    color:#12112e;
    font-weight: 500;
    border-radius: 6px;
    background-color: transparent;
    margin-left:10px;

    &:focus {
        outline: none;
        &::placeholder {
            opacity: 0;
        }
    }

    &::placeholder {
        color: #bebebe;
        transition: all 250ms ease-in-out;
    }
`;

const SearchBar = () => {
    const [query, setQuery] = useState()
    const [results, setResults] = useState(["", ""])
    const navigate = useNavigate()

    // const getResult = () =>{
    //     axios
    //     .get(`${backend}`)
    // }
    const getSearchByTag = (query) => {
        axios
            .get(`${backend}tag?slug=${query}`)
            .then(res => {
                if (res.data.data.length > 0) {
                    axios
                        .get(`${backend}article?tags=${res.data.data[0]._id}`)
                        .then(res => {
                            console.log(res.data, "tag")
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

    const getSearchByTitle = (query) => {
        axios
            .get(`${backend}article?slug=${query}`)
            .then(res => {
                console.log(res.data, "Title")
                let tmp = [...results]
                tmp[1] = res.data.data
                setResults(tmp)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const onHandleChange = (e) => {
        setQuery(e.target.value)
        getSearchByTag(e.target.value)
        getSearchByTitle(e.target.value)
    }

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
                finalRes = [...finalRes, tmpE]
            }

        })
        console.log(finalRes, "tranformed")

        return finalRes
    }
    const handleOnChoose = (i) => {
        const func = () => {
            navigate(`/question?questionId=${transform(results)[i]._id}`)
        }
        return func
    }

    const handleOnSubmit = () =>{
        console.log(query)
        if (query) navigate(`/search?find=${query}`)
        // if (query) navigate(`/search/${query}`)
    }

    return (
        <div>
            <div className='search-container'>
                <i> <FaSearch color="#bebebe" /></i>
                <form onSubmit={handleOnSubmit}>
                    <SearchInput placeholder="Search..." value={query} onChange={onHandleChange}
                    />
                </form>
            </div>
            <div style={{
                position: "absolute",
                width: "400px"
            }}>
                {query && <Dropdown items={transform(results).slice(0,5)} onChoose={handleOnChoose} />}
            </div>
        </div>
    )
}

export default SearchBar
