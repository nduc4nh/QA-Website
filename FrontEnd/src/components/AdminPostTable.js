import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backend } from '../store/endPoints';
import { truncate } from '../utils/StringProcessing';
import AdminPostTableItem from './AdminPostTableItem';
import './css/base.css';
import './css/User.css';
import { lightGrey, primaryGrey } from '../constant/color';
import CustomButton from './CustomButton';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
const AdminPostTable = ({ chosenUser }) => {
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState()
    const [checkedPost, setCheckedPost] = useState([])

    useEffect(() => {
        axios
            .get(`${backend}article?createdBy=${chosenUser}`)
            .then(res => {
                console.log(res.data.data)
                setPosts(res.data.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [page, chosenUser])

    const onHandleDelete = () => {
        console.log(checkedPost)
        checkedPost.forEach(postId => {

            axios.delete(`${backend}article/${postId}`, {
                headers: {
                    'x-access-token': localStorage.getItem("token")
                }
            })
                .then(res => {
                    axios.get(`${backend}article?createdBy=${chosenUser}`)
                        .then(res1 => {
                            setPosts(res1.data.data)
                        })
                        .catch((e) => {
                            console.log(e)
                        })
                })
                .catch((e) => {
                    console.log(e)
                })
        })
    }

    const handleOnChange = (e) => {
        let isnum = /^\d+$/.test(e.target.value);
        let num = e.target.value
        if (!isnum && num != "") return

        setPage(num === "" ? 1 : num)
    }

    return (
        <div class="home-product">
            <a href="https://www.google.com" />
            <div class="grid__row home-product__edits">
                <div className="home-product__edit">
                    <i class="fas fa-plus"></i>
                    Add
                </div>
                <div className="home-product__edit" onClick={onHandleDelete}>
                    <i class="far fa-trash-alt"></i>
                    Delete
                </div>
                {/* <div className="home-product__edit">
                    <i class="far fa-edit"></i>
                    Edit
                </div> */}
            </div>
            <div class="grid__row home-product__option">
                <span className="home-product__user-text"> Post</span>
            </div>
            <div className="home-product__tilter">
                <div className="home-product__tilter--header">
                    <div class="grid__row">
                        <div class="grid__column-2-product">
                            Id
                        </div>
                        <div class="grid__column-2-product">
                            Title
                        </div>
                        <div class="grid__column-2-product">
                            Date
                        </div>
                        <div class="grid__column-2-product">
                            Likes
                        </div>
                        <div class="grid__column-2-product">
                            Dislikes
                        </div>
                        <div class="grid__column-2-product">
                            Views
                        </div>
                        <div class="grid__column-2-product">
                            Choose
                        </div>
                        <div class="grid__column-2-product">
                            Inspect
                        </div>
                    </div>
                </div>
                {!posts ?
                    <div style={{ display: "flex", justifyContent: "center" }}>No post available</div>
                    : <></>}
                <div style={{ overflowY: "scroll" }}>
                    {posts && (posts === [] ? posts.map((item, i) =>
                        <AdminPostTableItem
                            id={item._id}
                            title={truncate(item.title, 10)}
                            date={new Date(item.createdAt * 1000).toLocaleString()}
                            dislikes={0}
                            likes={0}
                            view={item.clickCount}
                            setChecked={setCheckedPost} />) : <div style={{ display: "flex", justifyContent: "center" }}>No post available</div>)}
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <CustomButton backgroundColor={lightGrey} hoverColor={primaryGrey}>
                        <AiOutlineArrowLeft />
                    </CustomButton>
                    <input value={page} onChange={handleOnChange} style={{
                        width: "30px",
                        marginLeft: "10px",
                        marginRight: "10px"
                    }} />
                    <CustomButton backgroundColor={lightGrey} hoverColor={primaryGrey}>
                        <AiOutlineArrowRight />
                    </CustomButton>
                </div>
            </div>


        </div>

    );
}

export default AdminPostTable