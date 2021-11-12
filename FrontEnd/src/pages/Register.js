import React, {Component} from "react";


import './css/Login_Register.css'

class Register extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="register-background">
                <div className="register-container">
                    <div className="register-content row">
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
export default Register
