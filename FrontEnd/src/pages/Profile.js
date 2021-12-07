import { React, useState } from 'react'
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
const user = {
    name: "Username",
    avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",
    upvotes: 100,
    downvotes: 3,
    description: "Hi everyone this is my description"

}

const questions = [
    {
        title: "Why human are so madness?",
        content: "Question content, question content",
        user: {
            name: "poster",
            avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",

        },
        done:false,
        date: "October 31"
    },
    {
        title: "Question title",
        content: "Question content, question c, question content, question content",
        user: {
            name: "poster",
            avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",

        },
        done:true,
        date: "October 31"
    },
    {
        title: "Question title",
        content: "Question content, question content",
        user: {
            name: "poster",
            avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",

        },
        done:true,
        date: "October 31"
    },
    {
        title: "Question title",
        content: "Question content, question content",
        user: {
            name: "poster",
            avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",

        },
        done:true,
        date: "October 31"
    },
    {
        title: "Question title",
        content: "Question content, question content",
        user: {
            name: "poster",
            avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",

        },
        done:false,
        date: "October 31"
    }
]

const Profile = () => {
    const [option, setOption] = useState("Answered questions")

    const onChosenHandle = (chosen) => {
        setOption(chosen)
    }
    return (
        <div className='home' style={{ background: "white" }}>
            <div className='header-home'>
                <Navigationbar2 />
            </div>
            <Container style={{ paddingLeft: "100px", paddingRight: "100px" }}>
                <div className='content-home'>
                    <div className='content-left-side-home'>
                        s
                    </div>
                    <div className='content-main-home'>
                        <div className="profile-container">
                            <div className="profile-info">
                                <div className="profile-image">
                                    <RoundedImage source={user.avatar} width="100%" height="100%" />
                                </div>
                                <div className="profile-bio">
                                    <div className="profile-name">
                                        {user.name}
                                    </div>
                                    <div className="other-info">
                                        <ReputationBar upvotes={user.upvotes} downvotes={user.downvotes} />
                                    </div>
                                </div>
                            </div>
                            <div className="description">
                                <GiNotebook style={{ marginRight: 20 }} size={20} /> {user.description}
                            </div>
                        </div>
                        <div className="history-container">
                            <div style={{height:"3rem", width:"30rem"}}>
                            <CustomButtonGroup options={["Answered questions", "questions"]} chosen={option} onChosen={onChosenHandle} />
                            </div>
                            <div className="history-content">
                                {questions.map((item) => (<StretchCard question={item}/>))}
                            </div>
                        </div>
                    </div>
                    <div className='content-right-side-home'>

                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Profile
