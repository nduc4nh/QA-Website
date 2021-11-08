import React from 'react'
import './css/FlatListItem.css'
import { Image } from 'react-bootstrap'
import PropTypes from 'prop-types'

const FlatListItem = ({ userItem, name }) => {
    const onClickItem = () =>{
        console.log("abc");
    }

    return (
        <div
            onClick={onClickItem}
            className='container-item'>
            <div className='icon'>
                {userItem && <Image src = {userItem.avatar} width="50" height="50" roundedCircle/>}
            </div>
            <div className='name'>
                {userItem != undefined?userItem.name:name}
            </div>

        </div>
    )
}

export default FlatListItem

FlatListItem.propTypes = {
    users: PropTypes.object
}
