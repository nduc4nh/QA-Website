import { React, useState, useRef } from 'react'
import { Form } from 'react-bootstrap'
import './css/AddQuestionForm.css'
import styled from 'styled-components'
import CustomButton from './CustomButton'
import Tag from './Tag'
import { AiOutlineTag } from 'react-icons/ai'
import { BsImage } from 'react-icons/bs'

const TextArea = styled.textarea
    `
height:100px;
width:100%;

`
const AddQuestionForm = () => {
    const inputRef = useRef();

    const minRows_ = 2
    const maxRows_ = 100
    const [commentState, setCommentState] = useState([{
        value: '',
        rows: 2,
        minRows: minRows_,
        maxRows: maxRows_
    }])

    const [contents, setContents] = useState([{ type: "text" }])
    const [tagList, setTagList] = useState([])
    const [tagContent, setTagContent] = useState("")
    const [selectedFile, setSelectedFile] = useState({ image: null })

    const onHandleChange = (event, i) => {
        const textareaLineHeight = 24;
        const { minRows, maxRows } = commentState[i];
        const previousRows = event.target.rows;
        event.target.rows = minRows; // reset number of rows in textarea 

        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }
        let tmpCommentState = [...commentState]
        tmpCommentState[i] = {
            value: event.target.value,
            rows: currentRows < maxRows ? currentRows : maxRows,
            minRows: commentState[i].minRows,
            maxRows: commentState[i].maxRows
        }
        setCommentState(tmpCommentState)

    }
    const onHanleContent = (event) => {
        console.log(event.target.textcontent);
    }

    const handleOnTagSugmit = (event) => {
        console.log(tagList);
        if (event.key === "Enter") {
            if (event.target.value !== "") setTagList([...tagList, event.target.value])
            setTagContent("")
        }
    }

    const handleOnTagChange = (event) => {

        setTagContent(event.target.value)
    }

    const handleUploadImage = (event) => {
        console.log(selectedFile);
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            setSelectedFile({
                image: URL.createObjectURL(img)
            })
            console.log(selectedFile);
        }
    }
    /*
    <textarea
                autoFocus
                className='add-question-form-container'
                onChange={onHandleChange}
                value={commentState.value}
                placeholder={"Ask your question here .."}
                rows={commentState.rows}
            />
    */
    return (
        <div>
            <input className='add-title-container'
                placeholder='Enter title here ..' />
            <div className="custom-divider" />
            <div style={{ display: "flex", justifyContent: "center" }}>
                {selectedFile.image !== null ?
                    <div style={{ position: "relative", padding: "10px" }}>
                        <img alt="Empty" style={{ width: "300px",maxHeight:"400px", margin: "10px" }} src={selectedFile.image} />
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "#dddddf",
                            position: "absolute",
                            top: "5px",
                            right: "0",
                            width:"1rem",
                            height:"1rem",
                            borderRadius:"0.5rem",
                            fontSize:"0.8rem",
                            cursor:"pointer"
                        }}
                        onClick={()=>(setSelectedFile({
                            image:null
                        }))}
                        >
                            x
                        </div>
                    </div>
                    :
                    <></>}
            </div>
            <div
                onChange={onHanleContent}
                className='add-question-form-container'
            >
                {contents.map((item, i) => (item.type === "text" ? <textarea
                    id={i}
                    autoFocus
                    className='add-question-form-container'
                    onChange={event => onHandleChange(event, i)}
                    value={commentState[i].value}
                    placeholder={"Ask your question here .."}
                    rows={commentState[i].rows}
                /> : <></>))}

            </div>


            <div className="custom-divider" />
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px" }}>
                <AiOutlineTag size={25} style={{ marginLeft: "10px", marginRight: "10px" }} />
                <input
                    className='tag-input'
                    placeholder='Tag..'
                    value={tagContent}
                    onChange={handleOnTagChange}
                    onKeyDown={handleOnTagSugmit} />
                <BsImage size={25} style={{ marginLeft: "10px", marginRight: "10px", cursor: "pointer", marginLeft: "50%" }} onClick={() => (inputRef.current.click())} />
                <input type={"file"} hidden ref={inputRef} onChange={handleUploadImage} />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
                {tagList.map(item => <Tag label={item} />)}
            </div>
            <CustomButton backgroundColor="#d54d7b" hoverColor="#c2456f">
                <div style={{ height: "100%", color: "white" }}>
                    Add question
                </div>
            </CustomButton>
        </div>
    )
}

export default AddQuestionForm
