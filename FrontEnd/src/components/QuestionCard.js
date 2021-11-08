import React from 'react'
import { Card } from 'react-bootstrap'
import FlatListItem from './FlatListItem'
import './css/QuestionCard.css'
import InteractiveFooter from './InteractiveFooter'

const QuestionCard = ({ question }) => {
    return (
        <Card className="card-container">
            <Card.Header> <FlatListItem name={question.user.name} /></Card.Header>
            <Card.Title>{question.title}</Card.Title>
            <Card.Body>{question.content}</Card.Body>
            <Card.Footer>
                <InteractiveFooter />
            </Card.Footer>
        </Card>
    )   
}

export default QuestionCard
