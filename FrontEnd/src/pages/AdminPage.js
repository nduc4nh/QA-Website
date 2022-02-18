import React, {useRef, useState } from "react";


import '../components/css/User.css';
import '../components/css/base.css';
import '../assets/fontawesome-free-5.15.4-web/js/all.js';
import AdminUserTable from "../components/AdminUserTable";
import AdminPostTable from "../components/AdminPostTable";

const edits = []

const AdminPage = () => {
    const [chosenUser, setChosenUser] = useState()
    const ref = useRef()
    return (
        <div id="wrapper" style={{minHeight:"1080px"}}>
            
                <div class="navbar-header">
                    <div className="navbar-header-left">
                        <i class="fas fa-bars navbar-header-icon"></i>
                        <span class="header__navbar-title">Admin</span>
                    </div>
                    <div className="navbar-header-right">

                        <i class="far fa-user-circle navbar-header-icon"></i>
                        <span class="header__navbar-user-name">Bùi Hoàng Lọc</span>
                        <ul class="header__navbar-account-menu">

                            <li class="header__navbar-account-Logout">
                                <a href="http://localhost:3000/admin/login" className="logout" >Logout</a>

                            </li>
                        </ul>

                    </div>
                </div>
                <div class="navbar__container">
                    <div class="grid">
                        <div class="grid__row">
                            <div class="grid__column-2">
                                <nav class="category">
                                    <h3 class="category__heading">
                                        <i class="category__heading-icon fas fa-list"></i>
                                        Menu
                                    </h3>
                                    <ul class="category-list">
                                        <li class="category-item category-item--active">
                                            <a href="http://localhost:3000/admin/user" class="category-item__link ">Users</a>
                                        </li>
                                        <li class="category-item ">
                                            <a href="http://localhost:3000/admin/user" class="category-item__link">Posts</a>
                                        </li>

                                    </ul>
                                </nav>
                            </div>

                            <div class="grid__column-10">
                                <a href = "https://www.google.com" ref={ref} hidden>a</a>
                                <div onClick={() => ref.current.click()}>
                                _
                                </div>
                                <div className="grid__column-10-part">
                                    <AdminUserTable setChosenUser = {setChosenUser}/>
                                </div>
                                <div className="grid__column-10-part">
                                    <AdminPostTable chosenUser = {chosenUser}/>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>






            </div>

    )
}



export default AdminPage