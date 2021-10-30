import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { Container } from 'react-bootstrap'
import './css/Home.css'
import CustomFlatList from '../components/CustomFlatList'
import QuestionCard from '../components/QuestionCard'

const Home = () => {
    const question = [1,2,3,4,5,6,7,8]
    return (
        <div className='home'>
            <div className='header-home'>
                <NavigationBar />
            </div>
            <Container style={{paddingLeft:"100px",paddingRight:"100px",backgroundColor: "red" }}>
                <div className='content-home'>
                    <div className='content-left-side-home'>
                        <CustomFlatList />
                    </div>
                    <div className='content-main-home'>
                        {question.map((item) => (<QuestionCard/>))}
                    </div>
                    <div className='content-right-side-home'>
                        s
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home
