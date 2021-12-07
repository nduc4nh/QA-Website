import React from 'react'
import user from '../assets/user.jpeg'
const RoundedImage = ({source, width, height}) => {
    if (width == undefined) width = 50
    if (height == undefined) height = 50

    return (
        <img src = {source} width={width} height={height} style={{borderRadius:"50%"}}/>
    )
}

export default RoundedImage
