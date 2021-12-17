import React from 'react'
import CustomButton from './CustomButton'

const Tag = ({ label,removable}) => {
    const onDelete = () => {

    }
    return (
        <div style={{ position: "relative", height: "1.5rem", margin: "15px" }}>
            <CustomButton backgroundColor={"#dddddd"} border={20}>
                {label}
            </CustomButton>
            <div onClick={onDelete} style={{
                cursor: "pointer",
                background: "white",
                borderRadius: "0.5rem",
                position: "absolute",
                height: "1rem",
                width: "1rem",
                right: "-5px",
                top: "-5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div style={{ fontSize: "0.8rem" }}>x</div>
            </div>
        </div>
    )
}

export default Tag
