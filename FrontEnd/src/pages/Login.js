import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './css/Login_Register.css'
import '../assets/fontawesome-free-5.15.4-web/js/all.js'
import { useNavigate } from 'react-router'
import { loadUser, signIn } from '../store/action/authActions'
import { } from "react-router"
import { Link } from 'react-router-dom'

const Login = () => {

    const auth = useSelector((state) => state.auth)
    const [asAdmin, setAsAdmin] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (auth !== undefined && auth._id) {
            navigate("/")
        }
    }, [])

    const [criteria, setCriteria] = useState({
        noUsername: false,
        noPassword: false,
        incorrectPassword: false
    })

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(user);
        let stop = false

        if (user.password === "") {
            setCriteria({ ...criteria, noPassword: true })
            stop = true
        }

        if (user.username === "") {
            setCriteria({ ...criteria, noUsername: true })
            stop = true
        }
        console.log(asAdmin)
        if (stop) return
        dispatch(signIn(user, asAdmin?1:0)) 

        setUser({
            username: "",
            password: ""
        })
        

    }
    
    if (auth._id) {
        console.log(auth, "check")
        if (auth.asAdmin === 1 && auth.isAdministrator === 1) navigate("/admin/home", { replace: true })
        else if (auth.asAdmin === 1) console.log("warn")
        else  navigate("/", { replace: true })
    }

    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content">
                    <Link to="/" style={{ textDecoration: "none" }}><div className="col-12 text-header" style={{ cursor: "pointer" }}>QA Website</div></Link>
                    <div className="col-12 text-header">Login</div>

                    <div className="col-12 form-group login-input">
                        <label>{criteria.noUsername && <span style={{ color: "red" }}>*</span>}Username</label>
                        <input type="text" className="form-control" placeholder="Enter your username"
                            style={{ borderColor: criteria.noUsername ? "red" : "" }}
                            onChange={(event) => setUser({ ...user, username: event.target.value })}
                            onClick={() => setCriteria({ ...criteria, noUsername: false, noPassword: false })}
                            value={user.username.trim()}></input>
                    </div>

                    <div className="col-12 form-group login-input">
                        <label>{criteria.noPassword && <span style={{ color: "red" }}>*</span>}Password</label>
                        <input type="password" className="form-control" placeholder="Enter your password"
                            style={{ borderColor: criteria.noPassword ? "red" : "" }}
                            onChange={(event) => setUser({ ...user, password: event.target.value })}
                            onClick={() => setCriteria({ ...criteria, noUsername: false, noPassword: false })}
                            value={user.password.trim()}></input>
                    </div>
                    <div>
                        <input type={"checkbox"} onChange={(e) => setAsAdmin(e.target.checked)} defaultChecked={false}/>
                        <span> Login as admin</span>
                    </div>
                    <div className="col-12 ">
                        <button className="btn-login" onClick={handleOnSubmit}>Login</button>
                    </div>
                    <div className="col-12">
                        <span className="forgot-pass">Forget password?</span>
                    </div>

                    <div className="col-12 text-center">
                        <span className="text-otherLogin"> Or login with:</span>
                    </div>

                    <div class="auth-form__social">
                        <a href="" class="auth-form__social-icon--fb auth-form__social-icon--general ">
                            <i class="auth-form__social-icon fab fa-facebook-square"></i>
                            <span class="auth-form__title">Facebook</span>

                        </a>
                        <a href="" class="auth-form__social-icon--gg auth-form__social-icon--general ">
                            <i class="auth-form__social-icon fab fa-google auth-form__social-gg"></i>
                            <span class="auth-form__title">Google</span>

                        </a>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login
