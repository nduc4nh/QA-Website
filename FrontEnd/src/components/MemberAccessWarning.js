import React from 'react'
import { useNavigate } from 'react-router'
import CustomButton from './CustomButton'

const MemberAccessWarning = () => {
    let navigate = useNavigate();
    const onHandleSignIn = () => {
        navigate("/login")
    }
    const onHandleRegister = () => {
        navigate("/register")
    }
    return (
        <div style={{ width: "100%", height: "100%", paddingRight: "15px" }}>
            <div style={{ width: "" }}>
                <div>
                    {"This action requires member privilege 😉. Please login or register to our site"}
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
                    <div style={{ flex: 1 }}></div>
                    <div style={{ marginRight: "20px" }}>
                        <CustomButton border="20px" backgroundColor="#d54d7b" hoverColor="#c2456f"
                            onClick={onHandleSignIn}>
                            <div style={{ height: "100%", color: "white" }}>
                                {"Login"}
                            </div>
                        </CustomButton>
                    </div>
                    <CustomButton border="20px" backgroundColor="#d54d7b" hoverColor="#c2456f"
                        onClick={onHandleRegister}>
                        <div style={{ height: "100%", color: "white" }}>
                            {"Register"}
                        </div>
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}

export default MemberAccessWarning
