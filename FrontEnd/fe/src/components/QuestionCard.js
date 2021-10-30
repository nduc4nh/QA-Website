import React from 'react'
import { Card } from 'react-bootstrap'
import FlatListItem from './FlatListItem'
import './css/QuestionCard.css'

const QuestionCard = () => {
    return (
        <Card className = "card-container"> 
            <Card.Header> <FlatListItem name = {"user"}/></Card.Header>
            <Card.Title>Title</Card.Title>
            <Card.Body>Content</Card.Body>
            <Card.Footer>
            </Card.Footer>
        </Card>
    )
}

export default QuestionCard
