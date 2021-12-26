import axios from "axios"
import jwtDecode from "jwt-decode"
import {toast} from "react-toastify"

export const signUp = (user) =>{
    return (dispatch) => {
        axios
        .post(`http://127.0.0.1:8002/register`,user)
        .then(res => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token)
            dispatch({
                type: "SIGN_UP",
                token: res.data.token
            })
        })
        .catch( error => {
            console.log(error.response)

            toast.error(error.response?.token, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
}

export const loadUser = () =>{
    return (dispatch, getState) => {
        const token = getState().auth.token
        if (token){
            dispatch({
                type:"LOAD_USER",
                token
            })
        }
    }
}

export const signIn = (user) =>{
    return (dispatch) => {
        axios
        .post(`http://192.168.100.215:8002/user/login`,user)
        .then(res => {
            console.log(res.data.token);
            localStorage.setItem("token", res.data.token)
            dispatch({
                type: "SIGN_IN",
                token: res.data.token
            })
        })
        .catch( error => {
            console.log(error.response)

            toast.error(error.response?.token, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
}

export const signOut = () =>{
    return (dispatch) => {
        localStorage.removeItem("token")
        dispatch({
            type:"SIGN_OUT"
        })
    }
}