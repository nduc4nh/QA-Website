import React from 'react'
import './css/navigationbar.css'
import SearchBar from './SearchBar'
import logo from '../assets/logo2.png'
import ImageWrapper from './ImageWrapper'
import styled from 'styled-components'
import CustomButton from './CustomButton'
import { AiOutlineHome } from 'react-icons/ai'
import { BsBell } from 'react-icons/bs'
import { IconContext } from 'react-icons'
import NotificationBell from './NotificationBell'
import RoundedImage from './RoundedImage'
import user from '../assets/user.jpeg'
import { useNavigate } from 'react-router'

const Brand = styled.h1`
    color: #d54d7b; 
    font-family: "Great Vibes", cursive; 
    font-size: 26px; 
    line-height: 10px; 
    font-weight: normal;     
    text-align: center; 
    text-shadow: 0 1px 1px #fff;
    margin-left:15px
`
const items = [
    {
        id: 1,
        content: "noti",
        time: "5 mins"
    },
    {
        id: 2,
        content: "noti",
        time: "4 mins"
    },
    {
        id: 3,
        content: "noti",
        time: "6 mins"
    }
]
const Navigationbar2 = () => {
    let navigate = useNavigate();
    return (
        <div className='container-nav'>
            <div className='logo'>
                <ImageWrapper source={logo} width={50} height={50} />
            </div>
            <CustomButton backgroundColor="white" hoverColor="white" onClick={() => (navigate("/"))}>
                <Brand>QA Website</Brand>
            </CustomButton>
            <div className='tool-group'>
                <SearchBar />
                <div style={{ marginLeft: "10px", height: "100%" }}>
                    <CustomButton>
                        <AiOutlineHome size={40} />
                    </CustomButton>
                </div>
                <div>
                    <NotificationBell items={items} number={99} size={40} />
                </div>
                <div style={{ marginLeft: "20px", marginRight: "10px" }}>
                    <CustomButton border="10px" onClick={() => (navigate("/profile/1", { replace: true }))}>
                        <RoundedImage source={user} />
                        <div style={{ marginLeft: "10px" }}>
                            Username
                        </div>
                    </CustomButton>
                </div>

                <CustomButton border="20px" backgroundColor="#d54d7b" hoverColor="#c2456f">
                    <div style={{ height: "100%", color: "white" }}>
                        Add question
                    </div>
                </CustomButton>

                <div style={{ marginLeft: "10px" }}>
                    <CustomButton border="20px" backgroundColor="#d54d7b" hoverColor="#c2456f">
                        <div style={{ height: "100%", color: "white" }}>
                            Logout
                        </div>
                    </CustomButton>
                </div>
            </div>

        </div>
    )
}

export default Navigationbar2
