import axios from "axios"
import jwtDecode from "jwt-decode"
import {toast} from "react-toastify"
import { removeImage, storeImage } from "../../utils/imageProcessing"
import { dataURLtoFile } from "../../utils/StringProcessing"
import { backend, imageEnpoints } from "../endPoints"

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
        .post(`${backend}user/login`,user)
        .then(res => {
            console.log(res.data.token);
            localStorage.setItem("token", res.data.token)
            dispatch({
                type: "SIGN_IN",
                token: res.data.token
            })
            axios
            .get(`${imageEnpoints}image/get/${res.data._id}`)
            .then(res1 =>{
                storeImage(res1.data.image["image"])
            })
            .catch((e) =>{
                console.log(e)
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
        removeImage()
        dispatch({
            type:"SIGN_OUT"
        })
    }
}

export const getUserImage = (id,setImage) =>{
    axios
    .get(`${imageEnpoints}image/get/${id}`)
    .then(res =>{
        let imgbs64 = res.data.image["image"] 
        console.log(URL.createObjectURL(
            dataURLtoFile(imgbs64)
        ))
        setImage(URL.createObjectURL(
            dataURLtoFile(imgbs64)
        ))
    })    
}

export const getPostImage = (id,setImage) =>{
    axios
    .get(`${imageEnpoints}image/post/get/${id}`)
    .then(res =>{
        let imgbs64 = res.data.image["image"] 
        console.log(URL.createObjectURL(
            dataURLtoFile(imgbs64)
        ))
        setImage(URL.createObjectURL(
            dataURLtoFile(imgbs64)
        ))
    })    
}

export const getAllCategory = () =>{
    axios
    .get(`${backend}category`)
    .then(res =>{
        return res.data["data"]
    })
    .catch((e) =>{
        return []
    })
}