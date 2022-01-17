import React from 'react'
import CustomButton from './CustomButton'
import { BsBell } from 'react-icons/bs'
import styled from 'styled-components'
import './css/NotificationBell.css'
import { useState } from 'react'
import Dropdown from './Dropdown'
const NotificationBell = ({ number, size, items }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <CustomButton onClick = {() => (setIsOpen(!isOpen))}>
                <BsBell size={size} />
                <div className='noti-indicator'>
                    <p style={{ color: "white", fontSize: 14, textAlign: "center" }}>{1}</p>
                </div>
            </CustomButton>
            
            {false && isOpen && <div
                style={{
                    position: "absolute",
                    top: 80,
                    width:"300px"
                }}>
                <Dropdown items={items} />
            </div>}

        </div>
    )
}

export default NotificationBell
