import React from 'react'
import './css/FlatListItem.css'
import { Image } from 'react-bootstrap'
import PropTypes from 'prop-types'

const FlatListItem = ({ userItem, name, onChoose }) => {
    const onClickItem = () => {
        console.log("abc");
    }

    return (
        <div
            className='container-item'
            onClick={onChoose}>
            <div className='icon'>
                {userItem && <Image src={userItem.avatar} width="50" height="50" roundedCircle />}
            </div>
            <div className='name'>
                {userItem != undefined ? userItem.name : name}
            </div>

        </div>
    )
}

export default FlatListItem

FlatListItem.propTypes = {
    users: PropTypes.object
}
