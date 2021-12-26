import React, { useState } from 'react'
import './css/Login_Register.css'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../store/action/authActions'

const Register = () => {
    const [criteria, setCriteria] = useState({
        noName: false,
        noUsername: false,
        noPassword: false,
        noConfirmedPwd: false,
        unMatch: false
    })
    const [confirmedPwd, setConfirmedPwd] = useState("")
    const [user, setUser] = useState({
        name: "",
        username: "",
        password: ""
    })
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(user);
        let stop = false

        if (user.name.trim() === "") {
            setCriteria({ ...criteria, noName: true })
            stop = true
        }

        if (confirmedPwd === "") {
            setCriteria({ ...criteria, noConfirmedPwd: true })
            stop = true
        }

        if (user.password === "") {
            setCriteria({ ...criteria, noPassword: true })
            stop = true
        }

        if (user.username === "") {
            setCriteria({ ...criteria, noUsername: true })
            stop = true
        }

        if (stop) return

        if (confirmedPwd !== user.password) {
            setCriteria({ ...criteria, unMatch: true })
            setUser({...user,
                password: ""
            })
            setConfirmedPwd("")
            return
        }

        dispatch(signUp(user))
        // setUser({   
        //     name:"",
        //     username: "",
        //     password: "",
        // })
        // setConfirmedPwd("")
    }

    return (
        <div className="login-background">

            <div className="login-container">
                <div className="login-content">

                    <div className="col-12 text-header">QA Website</div>
                    <div className="col-12 text-header">Register</div>
                    {/* <div className="col-12 form-group login-input">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Enter your email"></input>
                        </div> */}
                    <div className="col-12 form-group login-input">
                        <label>{criteria.noName && <span style={{ color: "red" }}>*</span>}Name</label>
                        <input type="text" className="form-control" placeholder="Enter your name"
                            style={{ borderColor: criteria.noName ? "red" : "" }}
                            onChange={(event) => setUser({ ...user, name: event.target.value})}
                            onClick={() => setCriteria({ ...criteria, noConfirmedPwd: false, noUsername: false, noPassword: false, noName: false })}
                            value={user.name}></input>
                    </div>
                    <div className="col-12 form-group login-input">
                        <label>{criteria.noUsername && <span style={{ color: "red" }}>*</span>}Username</label>
                        <input type="text" className="form-control" placeholder="Enter your email"
                            style={{ borderColor: criteria.noUsername ? "red" : "" }}
                            onChange={(event) => setUser({ ...user, username: event.target.value.trim() })}
                            onClick={() => setCriteria({ ...criteria, noConfirmedPwd: false, noUsername: false, noPassword: false, noName: false })}
                            value={user.username}></input>
                    </div>
                    <div className="col-12 form-group login-input">
                        <label>{criteria.noPassword && <span style={{ color: "red" }}>*</span>}Password</label>
                        <input type="password" className="form-control" placeholder="Enter your password"
                            style={{ borderColor: criteria.noPassword ? "red" : "" }}
                            onChange={(event) => setUser({ ...user, password: event.target.value.trim() })}
                            onClick={() => setCriteria({ ...criteria, noConfirmedPwd: false, noUsername: false, noPassword: false, noName: false })}
                            value={user.password}
                        ></input>
                    </div>
                    <div className="col-12 form-group login-input">
                        <label>{criteria.unMatch && criteria.noConfirmedPwd && <span style={{ color: "red" }}>*</span>}Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Re-enter your password"
                            style={{ borderColor: criteria.unMatch ? "red" : "" }}
                            onChange={(event) => setConfirmedPwd(event.target.value.trim())}
                            onClick={() => setCriteria({ ...criteria, unMatch: false, noConfirmedPwd: false, noUsername: false, noPassword: false, noName: false })}
                            value={confirmedPwd}></input>
                    </div>
                    {criteria.unMatch ? <div style={{ fontSize: "1rem", color: "red" }}>Entered password does not match. Please try again.</div> : <></>}
                    <div className="col-12 ">
                        <button onClick={handleOnSubmit} className="btn-login">Register</button>
                    </div>

                    <div className="col-12 text-center">
                        <span className="text-otherLogin"> Or register with:</span>
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

export default Register

