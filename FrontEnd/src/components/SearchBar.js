import React from 'react'
import './css/SearchBar.css'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'

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
    return (
        <div className='search-container'>
            <i> <FaSearch color="#bebebe"/></i>
            <SearchInput placeholder="Search..." />
        </div>
    )
}

export default SearchBar
