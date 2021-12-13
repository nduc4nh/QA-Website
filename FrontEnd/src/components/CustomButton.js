import React from 'react'
import './css/Custombutton.css'
import { useState } from 'react'

const CustomButton = ({ children, height, width, border, backgroundColor, hoverColor, onClick }) => {
    if (backgroundColor === undefined) backgroundColor = "white"
    if (hoverColor === undefined) hoverColor = "#f0f0f0"
    const [color, setColor] = useState(backgroundColor)
    return (
        <div
            onClick={onClick}
            className='btn'
            style={{
                display:"flex",
                justifyContent:"center",
                width: width,
                height: height,
                borderRadius: border === undefined ? 0 : border,
                backgroundColor: color
            }}
            onMouseEnter= {() => (
                setColor(hoverColor)
            )}
            onMouseLeave = {() => (
                setColor(backgroundColor)
            )}
        >
            {children}
        </div>
    )
}

export default CustomButton
