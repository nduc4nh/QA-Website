import { React, useState } from 'react'
import { Form } from 'react-bootstrap'
import './css/AddQuestionForm.css'
import styled from 'styled-components'
import CustomButton from './CustomButton'

const TextArea = styled.textarea
    `
height:100px;
width:100%;

`
const AddQuestionForm = () => {
    const [commentState, setCommentState] = useState({
        value: '',
        rows: 5,
        minRows: 5,
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
        <div>
            <input className='add-title-container'
                placeholder='Enter title here ..'  />
            <div className = "custom-divider"/>
            <textarea
                autoFocus   
                className='add-question-form-container'
                onChange={onHandleChange}
                value={commentState.value}
                placeholder={"Ask your question here .."}
                rows={commentState.rows}
            />
            <CustomButton backgroundColor="#d54d7b" hoverColor="#c2456f">
                <div style={{ height: "100%", color: "white" }}>
                    Add question
                </div>
            </CustomButton>
        </div>
    )
}

export default AddQuestionForm
