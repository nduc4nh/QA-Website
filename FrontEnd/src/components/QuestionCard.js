import React from 'react'
import { Card, Container } from 'react-bootstrap'
import FlatListItem from './FlatListItem'
import './css/QuestionCard.css'
import InteractiveFooter from './InteractiveFooter'
import UserHeaderGroup from './UserHeaderGroup'
import { Link } from 'react-router-dom'

const QuestionCard = ({ question }) => {
    return (
        <Card className="card-container">
            <div style={{ margin: 15 }}>
                <UserHeaderGroup user={question.user} otherInfo={question.date} />

            </div>
            <Card.Title>
                <div style={{ marginLeft: 15 }}>
                    <Link to="/question" style={{textDecoration:"none", color:"black"}}>{question.title}</Link>
                </div>
            </Card.Title>
            <Card.Body>
                {question.content}
            </Card.Body>
            <div style={{ flex:1 }}>
                <InteractiveFooter />
            </div>
        </Card>
    )
}

export default QuestionCard
