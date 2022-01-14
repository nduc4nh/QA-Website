import React from 'react'
import CustomButton from './CustomButton'
import './css/Dropdown.css'
const DropdownElem = ({ item }) => {
    return (
        <div className="dropdown-item-container">
            <div className="dropdown-item-content">
                {item.content}
            </div>
            <div className="dropdown-item-time">
                {item.time}
            </div>
        </div>
    )
}

export default DropdownElem
