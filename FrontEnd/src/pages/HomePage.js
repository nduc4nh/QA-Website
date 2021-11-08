import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { Container } from 'react-bootstrap'
import './css/Home.css'
import CustomFlatList from '../components/CustomFlatList'
import QuestionCard from '../components/QuestionCard'

const HomePage = () => {
    const questions = [
        {
            title: "Question title",
            content: "Question content, question content",
            user: {
                name: "poster",
                avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",

            },
            date: "October 31"
        },
        {
            title: "Question title",
            content: "Question content, question content",
            user: {
                name: "poster",
                avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",
                
            },
            date:"October 31"
        },
        {
            title: "Question title",
            content: "Question content, question content",
            user: {
                name: "poster",
                avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",
                
            },
            date:"October 31"
        },
        {
            title: "Question title",
            content: "Question content, question content",
            user: {
                name: "poster",
                avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",
                
            },
            date:"October 31"
        },
        {
            title: "Question title",
            content: "Question content, question content",
            user: {
                name: "poster",
                avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",
                
            },
            date:"October 31"
        }
    ]
    return (
        <div className='home'>
            <div className='header-home'>
                <NavigationBar />
            </div>
            <Container style={{ paddingLeft: "100px", paddingRight: "100px"}}>
                <div className='content-home'>
                    <div className='content-left-side-home'>
                        <CustomFlatList users = {questions.map((item) => (item.user))} />
                    </div>
                    <div className='content-main-home'>
                        {questions.map((item) => (<QuestionCard question={item} />))}
                    </div>
                    <div className='content-right-side-home'>
                        s
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default HomePage
