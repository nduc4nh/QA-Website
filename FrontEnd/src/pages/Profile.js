import { React, useState, useEffect, useRef } from 'react'
import Navigationbar2 from '../components/Navigationbar2'
import { Container } from 'react-bootstrap'
import UserHeaderGroup from '../components/UserHeaderGroup'
import RoundedImage from '../components/RoundedImage'
import { GiNotebook } from 'react-icons/gi'
import './css/Profile.css'
import './css/Home.css'
import ReputationBar from '../components/ReputationBar'
import CustomButtonGroup from '../components/CustomButtonGroup'
import QuestionCard from '../components/QuestionCard'
import StretchCard from '../components/StretchCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUserImage, loadUser } from '../store/action/authActions'
import axios from 'axios'
import { getOffsetTimeString } from '../utils/TimeConverter'
import { backend, imageEnpoints } from '../store/endPoints'
import CustomButton from '../components/CustomButton'
import { AiFillCamera } from 'react-icons/ai'
import { dataURLtoFile, toBase64 } from '../utils/StringProcessing'
import { convertBs64toBlob, getImage, storeImage } from '../utils/imageProcessing'
import CustomFlatList from '../components/CustomFlatList'
import Footer from '../components/Footer'


const description = "Hello every one, I'm here to answer all of your question"
const Profile = () => {
    const [userImage, setUserImage] = useState()

    const dispatch = useDispatch()
    const [questions, setQuestions] = useState()
    const [selectedFile, setSelectedFile] = useState({ image: null })
    const inputRef = useRef()

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])
    window.scrollTo(0,0)
    const user = useSelector((state) => state.auth)
    const imgb = getImage()
    console.log(imgb)

    console.log(user, "use selector")
    const handleUploadImage = async (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            setSelectedFile({
                image: URL.createObjectURL(img)
            })
            let imgbs64 = await toBase64(img)
            // var reader = new FileReader()
            // reader.readAsDataURL(URL.createObjectURL(img))

            axios
                .put(`${imageEnpoints}image/get/${user._id}`, { image: `${imgbs64}` },
                    {
                        headers: {
                            "x-access-token": user.token
                        }
                    })
                .then(res => {
                    storeImage(imgbs64)
                    setUserImage(URL.createObjectURL(
                        dataURLtoFile(imgbs64)
                    ))
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }

    const refClick = () => {
        inputRef.current.click()
    }

    console.log(user, "check user");
    const [option, setOption] = useState("Answered questions")

    const getQuestions = () => {
        axios
            .get(`${backend}article?createdBy=${user._id}&page=1`)
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

    useEffect(() => {
        getQuestions()
        //if (user._id !== null) getUserImage(user._id, setUserImage)
    }, [user])

    const onChosenHandle = (chosen) => {
        setOption(chosen)
    }
    return (
        <div className='home' style={{ background: "white" }}>
            <div className='header-home'>
                <Navigationbar2 user={user} />
            </div>
            <Container style={{ paddingLeft: "100px", paddingRight: "100px", paddingTop:"30px", height:"100%" }}>
                <div className='content-home'>
                    <div className='content-main-home'>
                        <div className="profile-container" >
                            <div className="profile-info">
                                <div className="profile-image">
                                    {imgb && <RoundedImage source={convertBs64toBlob(imgb)} width="100%" height="100%" />}
                                    <div style={{
                                        position: "absolute",
                                        bottom: "10%",
                                        right: "10%",
                                    }}>
                                        <CustomButton
                                            height={"3rem"}
                                            width={"3rem"}
                                            border={"1.5rem"}
                                            backgroundColor={"#dddddd"}
                                            onClick={refClick}>
                                            <AiFillCamera size={24} />
                                        </CustomButton>
                                        <input type={"file"} hidden ref={inputRef} onChange={handleUploadImage} />
                                    </div>
                                </div>
                                <div className="profile-bio">
                                    <div className="profile-name">
                                        {user.username}
                                    </div>
                                    <div className="other-info">
                                        <ReputationBar upvotes={user.upvotes} downvotes={user.downvotes} />
                                        <div style={{ flex: 1 }}>
                                            {description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="description">
                                <GiNotebook style={{ marginRight: 20 }} size={20} /> {"Seeking the truth of the Universe"}
                            </div>
                        </div>
                        <div className="history-container">
                            <div style={{ height: "3rem", width: "30rem" }}>
                                <CustomButtonGroup options={["Answered questions", "questions"]} chosen={option} onChosen={onChosenHandle} />
                            </div>
                            <div className="history-content">
                                {questions && questions.map((item) => (<StretchCard question={item} />))}
                            </div>
                        </div>
                    </div>
                    <div className='content-right-side-home'>
                        
                    </div>
                </div>
            </Container>
            <Footer/>
        </div>
    )
}

export default Profile
