import { React, useState } from 'react'
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
import userImg from '../assets/user.jpeg'
import { useNavigate } from 'react-router'
import Popup from './Popup'
import CommentBar from './CommentBar'
import AddQuestionForm from './AddQuestionForm'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../store/action/authActions'
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
const Navigationbar2 = ({ user }) => {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const [isAddQuestion, setIsAddQuestion] = useState(false)
    const handleAddQuestion = () => {
        setIsAddQuestion(!isAddQuestion)
    }

    const onHandleSignIn = () => {
        navigate("/login")
    }

    const onHandleSighOut = () => {
        dispatch(signOut())
        navigate("/login", { replace: true })
    }

    const onHandleRegister = () => {
        navigate("/register")
    }

    const popUpControl = () => {
        if (!isAddQuestion) return <></>
        if (user._id) {
            return (
                <Popup handleClose={handleAddQuestion} title={"Create Question"}>
                    <div style={{ width: "100%", height: "100%", paddingRight: "15px" }}>
                        <AddQuestionForm />
                    </div>
                </Popup>
            )
        }
        else {
            return (
                <Popup handleClose={handleAddQuestion} title={"Member Access Requirement"}>
                    <div style={{ width: "100%", height: "100%", paddingRight: "15px" }}>
                        <div style={{ width: "" }}>
                            <div>
                                {"This action requires member privilege 😉. Please login or register to our site"}
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
                                <div style={{ flex: 1 }}></div>
                                <div style={{ marginRight: "20px" }}>
                                    <CustomButton border="20px" backgroundColor="#d54d7b" hoverColor="#c2456f"
                                        onClick={onHandleSignIn}>
                                        <div style={{ height: "100%", color: "white" }}>
                                            {"Login"}
                                        </div>
                                    </CustomButton>
                                </div>
                                <CustomButton border="20px" backgroundColor="#d54d7b" hoverColor="#c2456f"
                                    onClick={onHandleRegister}>
                                    <div style={{ height: "100%", color: "white" }}>
                                        {"Register"}
                                    </div>
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                </Popup>
            )
        }

    }

    return (
        <div>
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
                    <div style={{ marginLeft: "20px", marginRight: "10px", height: "65px" }}>
                        {user._id ? <CustomButton border="10px" onClick={() => (navigate("/profile/" + user._id, { replace: true }))}>
                            <RoundedImage source={userImg} />
                            <div style={{ marginLeft: "10px" }}>
                                {user.username}
                            </div>
                        </CustomButton> : <CustomButton></CustomButton>}
                    </div>

                    <CustomButton border="20px" backgroundColor="#d54d7b" hoverColor="#c2456f" onClick={handleAddQuestion}>
                        <div style={{ height: "100%", color: "white" }}>
                            Add question
                        </div>
                    </CustomButton>

                    <div style={{ marginLeft: "10px" }}>
                        <CustomButton border="20px" backgroundColor="#d54d7b" hoverColor="#c2456f"
                            onClick={user._id ? onHandleSighOut : onHandleSignIn}>
                            <div style={{ height: "100%", color: "white" }}>
                                {user._id ? "Logout" : "Login"}
                            </div>
                        </CustomButton>
                    </div>
                    {
                        !user._id &&
                        <div style={{ marginLeft: "10px" }}>
                            <CustomButton border="20px" backgroundColor="#d54d7b" hoverColor="#c2456f"
                                onClick={onHandleRegister}>
                                <div style={{ height: "100%", color: "white" }}>
                                    {"Register"}
                                </div>
                            </CustomButton>
                        </div>
                    }
                </div>

            </div>
            {popUpControl()}
        </div>
    )
}

export default Navigationbar2
