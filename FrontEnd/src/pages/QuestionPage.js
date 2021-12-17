import NavigationBar from '../components/NavigationBar'
import { Container, Dropdown, Button, ButtonGroup, Image, Card } from 'react-bootstrap'
import './css/Home.css'
import './css/QuestionPage.css'
import { BiUpvote, BiDownvote } from 'react-icons/bi'
import { FaRegEdit } from 'react-icons/fa'
import CommentBar from '../components/CommentBar'
import CommentBox from '../components/CommentBox'
import { useRef } from 'react'
import Navigationbar2 from '../components/Navigationbar2'

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setFocus]
}

const QuestionPage = ({ question }) => {
    const [inputRef, setInputFocus] = useFocus()
    const questionTmp = {
        title: "Question title",
        content: "Question content, question content",
        user: {
            name: "poster",
            avatar: "http://ativn.edu.vn/wp-content/uploads/2018/03/user.png",

        },
        date: "October 31"
    }
    return (
        <div className='home'>
            <div className='header-home'>
                <Navigationbar2/>
            </div>
            <Container style={{ paddingLeft: "100px", paddingRight: "100px" }}>
                <div className='content-home'>
                    <div className='content-main-home'>
                        <div className="content-header-container" style={{ height: 100 }}>
                            <div style={{ fontSize: 40, fontWeight: "bold" }}>
                                {questionTmp.title}
                            </div>
                            <div className="title-footer" style={{ alignSelf: "end" }}>
                                
                                <div className="btn-answer">
                                    <i class="far fa-edit btn-answer-icon"></i>
                                    Answer
                                </div>
                                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                                    
                                    <div className="vote">
                                        <div className="footer-btn-upvote footer-btn-suggest">
                                            <span class="footer-btn-upvote__like footer-btn-upvote__like-liked">
                                                <i className="fas fa-arrow-alt-circle-up footer-btn-upvote__like-no"></i>
                                                <i className="fas fa-arrow-alt-circle-up footer-btn-upvote__like-yes"></i>
                                            </span>
                                            
                                            <span className="suggestions">
                                                UpVote
                                            </span>
                                        </div>
                            
                                        <div className="footer-btn-downvote footer-btn-suggest">
                                            <i class="far fa-arrow-alt-circle-down footer-btn--icon"></i>
                                            <span className="suggestions">
                                                DownVote
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Dropdown.Divider />

                        <div className="content-body-container">
                            <div className="content-question-container">
                                <div className="poster-container">
                                    <Image src={questionTmp.user.avatar} roundedCircle />
                                    <div className="poster-info-holder">
                                        <div className="poster-name-holder">
                                            <div style={{ font: "bold", fontSize: 20 }}>
                                                {questionTmp.user.name}
                                            </div>
                                        </div>
                                        <div className="poster-date-holder">
                                            <div style={{ fontSize: 15, color: "grey" }}>
                                                {questionTmp.date}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Container>
                                    <Card.Body>
                                        {questionTmp.content}
                                    </Card.Body>
                                </Container>
                            </div>
                            <Dropdown.Divider />
                            <div className="content-answer-container">
                                <CommentBar inputRef = {inputRef}/>
                                <CommentBox />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </Container>
        </div>
    )
}

export default QuestionPage
