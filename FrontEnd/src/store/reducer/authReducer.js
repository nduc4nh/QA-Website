import jwtDecode from "jwt-decode"
import { toast } from "react-toastify"

const initialState = {
    token: localStorage.getItem("token"),
    username: null,
    isAdministrator: 0,
    _id: null,
    asAdmin: 0
}
const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case "SIGN_IN":
        case "LOAD_USER":
        case "SIGN_UP":
            const user = jwtDecode(action.token)
            console.log(user);
            return {
                ...initialState,
                token: action.token,
                username: user.username,
                isAdministrator: user.isAdministrator,
                _id: user._id,
                asAdmin: action.asAdmin
            }
        case "SIGN_IN_ADMIN":
            console.log(user,"check admin")
            return {
                ...initialState,
                token: action.token,
                username: user.username,
                isAdministrator: user.isAdministrator,
                _id: user._id,
                asAdmin: action.asAdmin
            }
        case "SIGN_OUT":
            localStorage.removeItem("token")
            console.log("signed out");
            return {
                token: null,
                username: null,
                isAdministrator: 0,
                _id: null,
                asAdmin: 0
            }
        default:
            return state
    }
};

export default authReducer