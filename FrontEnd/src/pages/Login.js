import React, {Component} from "react";


import './css/Login_Register.css'
import 'E:/QA-Website/FrontEnd/src/assets/fontawesome-free-5.15.4-web/js/all.js'


class Login extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content">
                        <div className="col-12 text-header">QA Website</div>
                        <div className="col-12 text-header"> Login</div>
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

                        <div class="auth-form__social">
                            <a href="" class="auth-form__social-icon--fb auth-form__social-icon--general ">
                                <i class="auth-form__social-icon fab fa-facebook-square"></i>
                                <span class="auth-form__title">Đăng nhập với Facebook</span>
                                
                            </a>
                            <a href="" class="auth-form__social-icon--gg auth-form__social-icon--general ">
                                <i class="auth-form__social-icon fab fa-google auth-form__social-gg"></i>
                                <span class="auth-form__title">Đăng nhập với Google</span>
                                
                            </a>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}


export default Login

