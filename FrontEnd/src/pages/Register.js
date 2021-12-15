import React, {Component} from "react";


import './css/Login_Register.css'

class Register extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="login-background">
        
                <div className="login-container">
                    <div className="login-content">
                        
                        <div className="col-12 text-header">QA Website</div>
                        <div className="col-12 text-header">Register</div>
                        <div className="col-12 form-group login-input">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Nhập tên đăng nhập"></input>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Mật khẩu</label>
                            <input type="password" className="form-control" placeholder="Nhập mật khẩu"></input>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Nhập lại mật khẩu</label>
                            <input type="password" className="form-control" placeholder="Nhập lại mật khẩu"></input>
                        </div>

                        <div className="col-12 ">
                            <button className="btn-login">Đăng kí</button>
                        </div>

                        <div className="col-12 text-center">
                            <span className="text-otherLogin"> Hoặc đăng kí với:</span>
                        </div>

                        
                        <div class="auth-form__social">
                            <a href="" class="auth-form__social-icon--fb auth-form__social-icon--general ">
                                <i class="auth-form__social-icon fab fa-facebook-square"></i>
                                <span class="auth-form__title">Đăng kí với Facebook</span>
                                
                            </a>
                            <a href="" class="auth-form__social-icon--gg auth-form__social-icon--general ">
                                <i class="auth-form__social-icon fab fa-google auth-form__social-gg"></i>
                                <span class="auth-form__title">Đăng kí với Google</span>
                                
                            </a>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}
export default Register

