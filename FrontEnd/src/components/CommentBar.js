import React from 'react'
import { useState } from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import './css/CommentBar.css'

const CommentBar = ({ inputRef }) => {
    const [commentState, setCommentState] = useState({
        value: '',
        rows: 1,
        minRows: 1,
        maxRows: 100
    })
    const onHandleChange = (event) => {
        const textareaLineHeight = 24;
        const { minRows, maxRows } = commentState;

        const previousRows = event.target.rows;
        event.target.rows = minRows; // reset number of rows in textarea 

        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        setCommentState({
            value: event.target.value,
            rows: currentRows < maxRows ? currentRows : maxRows,
            minRows: commentState.minRows,
            maxRows: commentState.maxRows
        })

    }

    return (
        <div className='comment-container'>
            <div className='avatar-container'>
                <img src={"sc"} />
            </div>
            <div className='comment-submit-container'>
                <div className='comment-form-container'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            as="textarea"
                            ref={inputRef}
                            onChange={onHandleChange}
                            value={commentState.value}
                            placeholder={"Enter comment here .."}
                            rows={commentState.rows}
                            style = {{borderRadius:"20px"}}
                        />
                    </Form.Group>
                </div>
                <div className='comment-btn-container'>
                    <div className="btn-answer">
                        Add comment
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentBar
