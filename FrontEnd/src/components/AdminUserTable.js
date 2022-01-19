import React, { useState, useEffect } from 'react'
import AdminUserTableItem from './AdminUserTableItem';
import './css/base.css';
import './css/User.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../store/action/authActions';
import axios from 'axios';
import { backend } from '../store/endPoints';
import CustomButton from './CustomButton';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { lightGrey, primaryColor, primaryGrey, primaryHoverColor } from '../constant/color';


const AdminUserTable = ({ setChosenUser }) => {
    const [page, setPage] = useState(1)
    const [users, setUsers] = useState()
    const [checkedUser, setCheckedUser] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const user = useSelector((state) => state.auth)
    const handleOnChange = (e) => {
        let isnum = /^\d+$/.test(e.target.value);
        let num = e.target.value
        if (!isnum && num != "") return

        setPage(num === "" ? 1 : num)
    }
    useEffect(() => {
        axios.get(`${backend}user?page=${page}`, {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res)
                setUsers(res.data.data)
            })
    }, [page])

    const getPostByUser = (id_) => {
        const func = () => {
            setChosenUser(id_)
        }
        return func
    }

    const onHandleDelete = () => {
        checkedUser.forEach(userId => {
            axios.delete(`${backend}user/${userId}`, {
                headers: {
                    'x-access-token': localStorage.getItem("token")
                }
            })
                .then(res => {
                    axios.get(`${backend}user`, {
                        headers: {
                            'x-access-token': localStorage.getItem("token")
                        }
                    })
                        .then(res1 => {
                            setUsers(res1.data)
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


    return (
        <div class="home-product">
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
                <span className="home-product__user-text"> User</span>
            </div>
            <div className="home-product__tilter">
                <div className="home-product__tilter--header">
                    <div class="grid__row">
                        <div class="grid__column-2-product">
                            Id
                        </div>
                        <div class="grid__column-2-product">
                            Name
                        </div>
                        <div class="grid__column-2-product">
                            Avatar
                        </div>
                        <div class="grid__column-2-product">
                            Status
                        </div>
                        <div class="grid__column-2-product">
                            Choose
                        </div>
                    </div>

                </div>

                {users && users.map((item, i) => <AdminUserTableItem id={item._id} name={item.username} avatar={""} status={""} onChoose={getPostByUser(item._id)} setChecked={setCheckedUser} />)}
                
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

export default AdminUserTable