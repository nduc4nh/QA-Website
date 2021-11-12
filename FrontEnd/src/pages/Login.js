import React, {Component} from "react";
import {connect} from 'react-redux';

import './css/Login.css'



class Login extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-header">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Tên đăng nhập</label>
                            <input type="text" className="form-control" placeholder="Nhập tên đăng nhập"></input>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Mật khẩu</label>
                            <input type="password" className="form-control" placeholder="Nhập mật khẩu"></input>
                        </div>

                        <div className="col-12 ">
                            <button className="btn-login">Đăng nhập</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-pass">Quên mật khẩu?</span>
                        </div>

                        <div className="col-12 text-center">
                            <span className="text-otherLogin"> Hoặc đăng nhập với:</span>
                        </div>

                        <div className="col-12 social-login">
                            <div className="iconGroup">
                                <i className="fab fa-facebook social-login-icon"></i>
                                <i className="fab fa-google social-login-icon"></i>
                            </div>
                            
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}


export default Login