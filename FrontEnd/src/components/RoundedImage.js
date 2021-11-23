import React from 'react'
import user from '../assets/user.jpeg'
const RoundedImage = ({source}) => {
    return (
        <img src = {source} width={50} height={50} style={{borderRadius:"50%"}}/>
    )
}

export default RoundedImage
