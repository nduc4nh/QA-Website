import { React, useState, useRef, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import './css/AddQuestionForm.css'
import styled from 'styled-components'
import CustomButton from './CustomButton'
import Tag from './Tag'
import { AiOutlineTag } from 'react-icons/ai'
import { BsImage } from 'react-icons/bs'
import axios from 'axios'
import { backend, imageEnpoints } from '../store/endPoints'
import { useNavigate } from 'react-router'
import Dropdown from './Dropdown'
import { getAllCategory } from '../store/action/authActions'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { toBase64 } from '../utils/StringProcessing'

const TextArea = styled.textarea
    `
max-height:200px;
width:100%;
overflow-y: scroll;
`
const AddQuestionForm = ({ postTitle, content, tags, image, edit }) => {
    const navigate = useNavigate()
    const inputRef = useRef();
    const [show, setShow] = useState(false)
    const [categoryList, setCategoryList] = useState()
    const [chosenCategory, setChosenCategory] = useState()

    if (!postTitle) postTitle = ''
    if (!content) content = ''
    if (!tags) tags = []
    if (!image) image = ''
    if (!edit) edit = false

    const minRows_ = 2
    const maxRows_ = 10
    const [commentState, setCommentState] = useState([{
        value: content,
        rows: 2,
        minRows: minRows_,
        maxRows: maxRows_
    }])
    const [title, setTitle] = useState(postTitle)
    const [contents, setContents] = useState([{ type: "text" }])
    const [tagList, setTagList] = useState(tags)
    const [tagContent, setTagContent] = useState("")
    const [selectedFile, setSelectedFile] = useState({ image: null,file: null })

    const getAllCategory = () => {
        axios
            .get(`${backend}category`)
            .then(res => {
                setCategoryList(res.data["data"])
            })
            .catch((e) => {
                console.log(e)
            })
    }
    useEffect(() => {
        getAllCategory()
    }, [])

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
        console.log(event.target.text);
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

    const onAddQuestion = async () => {
        let content = commentState.map(item => item.value).join(" ")
        if (content.trim() === "") return
        if (title.trim() === "") return
        if (chosenCategory === undefined) return
        let article = {
            title: title,
            content: content,
            categories: [chosenCategory._id],
            tags: tagList
        }
        let imgbs64;
        if (selectedFile.file) imgbs64 = await toBase64(selectedFile.file) 

        console.log(article);

        axios
            .post(`${backend}article`, article, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            })
            .then(res => {
                console.log(res);
                let newPostId = res.data._id
                if (selectedFile.file){
                    axios
                    .put(`${imageEnpoints}image/post/put/${newPostId}`,{ image: `${imgbs64}` })
                    .then(res =>{
                        console.log(res)
                    })
                    .catch((e) =>{
                        console.log(e)
                    })
                }
                navigate(`/question?questionId=${newPostId}`)
            })
            .catch(err => {
                console.log(err);
            })
    }
    const onUpdateQuestion = () => {

    }

    const handleUploadImage = (event) => {
        console.log(selectedFile);
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            setSelectedFile({
                image: URL.createObjectURL(img),
                file:img
            })
            
            console.log(selectedFile);
        }
    }

    const handleOnChoose = (i) => {
        const func = () => {
            setChosenCategory(categoryList[i])
            setShow(!show)
            console.log(chosenCategory)
        }
        return func
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
                placeholder='Enter title here ..'
                value={title}
                onChange={(event) => setTitle(event.target.value)} />

            <div className="custom-divider" />
            <div style={{ display: "flex", justifyContent: "center" }}>
                {selectedFile.image !== null ?
                    <div style={{ position: "relative", padding: "10px" }}>
                        <img alt="Empty" style={{ width: "300px", maxHeight: "400px", margin: "10px" }} src={selectedFile.image} />
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "#dddddf",
                            position: "absolute",
                            top: "5px",
                            right: "0",
                            width: "1rem",
                            height: "1rem",
                            borderRadius: "0.5rem",
                            fontSize: "0.8rem",
                            cursor: "pointer"
                        }}
                            onClick={() => (setSelectedFile({
                                image: null
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
                    style={{
                        overflowY:commentState[i].rows >= 10?"scroll":"auto",
                        maxHeight:"200px"
                    }}
                    
                /> : <></>))}

            </div>


            <div style={{ display: "flex", flexDirection: "row", marginBottom: "5px" }}>
                <div style={{ width: "150px", position: "relative", marginBottom: "5px", padding: "3px", background: "#dddddd" }}>
                    <CustomButton backgroundColor="white" hoverColor="#757575" onClick={() => setShow(!show)}>
                        <div style={{
                            height: "100%",
                            maxHeight: "1.2rem",
                            lineHeight: "1.2rem",
                            textAlign: "justify",
                            overflow: "hidden",
                            wordWrap: "break-word"
                        }}>
                            {chosenCategory ? chosenCategory.title : "Category"}
                        </div>
                        {show ? <AiFillCaretUp style={{ marginLeft: "10px" }} /> : <AiFillCaretDown style={{ marginLeft: "10px" }} />}
                    </CustomButton>
                </div>
                {/* <AiOutlineTag size={25} style={{ marginLeft: "10px", marginRight: "10px" }} /> */}
                <input
                    className='tag-input'
                    placeholder='Tag..'
                    value={tagContent}
                    onChange={handleOnTagChange}
                    onKeyDown={handleOnTagSugmit}
                    style={{ marginLeft: "30%", height: "100%" }} />
                <BsImage
                    color='#75757575'
                    size={25}
                    style={{ marginLeft: "10px", marginRight: "10px", cursor: "pointer", alignSelf: "center" }}
                    onClick={() => (inputRef.current.click())} />
                <input type={"file"} hidden ref={inputRef} onChange={handleUploadImage} />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
                {tagList.map((item, i) => <Tag label={item} removable={true} onDelete={() => setTagList(tagList.filter((item, j) => j != i))} />)}
            </div>

            <div>
                <div style={{
                    postion: "absolute"
                }}>
                    {show && <Dropdown
                        items={
                            categoryList.map((item) => ({ content: item.title }))}
                        onChoose={handleOnChoose}
                    />}
                </div>
            </div>

            {edit ?
                <CustomButton backgroundColor="#d54d7b" hoverColor="#c2456f" onClick={onUpdateQuestion}>
                    <div style={{ height: "100%", color: "white" }}>
                        Update question
                    </div>
                </CustomButton>
                :
                <CustomButton backgroundColor="#d54d7b" hoverColor="#c2456f" onClick={onAddQuestion}>
                    <div style={{ height: "100%", color: "white" }}>
                        Add question
                    </div>
                </CustomButton>
            }
        </div>
    )
}

export default AddQuestionForm
