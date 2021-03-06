import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { Container } from 'react-bootstrap'
import './css/Home.css'
import CustomFlatSearch from '../components/CustomFlatSearch'
import QuestionCard from '../components/QuestionCard'
import Navigationbar2 from '../components/Navigationbar2'
const Search = () => {
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
            content: "Question content, question c, question content, question content",
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
                <Navigationbar2 />
            </div>
            <Container style={{ paddingLeft: "100px", paddingRight: "100px"}}>
                <div className='content-home'>
                    <div className='content-left-side-home'>
                        <CustomFlatSearch users = {questions.map((item) => (item.user))} />
                    </div>
                    <div className='content-main-home'>
                      <span className='key-word'>Result for ""</span>
                      
                        {questions.map((item) => (<QuestionCard question={item} />))}
                    </div>
                    <div className='content-right-side-home'>
                        
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Search