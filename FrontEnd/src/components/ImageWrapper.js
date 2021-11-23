import React from 'react'

const ImageWrapper = ({source, width, height}) => {
    return (
        <img style={{backgroundColor: 'white'}} src = {source} width = {width} height = {height}/>
    )
}

export default ImageWrapper
