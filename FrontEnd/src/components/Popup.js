import React from 'react'
import './css/Popup.css'
import CustomButton from './CustomButton';
import { AiOutlineClose } from 'react-icons/ai';
const Popup = props => {
    return (
        <div className="box-popup">
            <div className="popup">
                <div className="popup-header">
                    <div className = "close-icon">
                    <div className = "popup-title">
                        {props.title}
                    </div>
                    <CustomButton border={"5px"} backgroundColor="#d54d7b" hoverColor="#c2456f" onClick={props.handleClose}>
                        <AiOutlineClose color='white'/>
                    </CustomButton>
                    </div>
                </div>

                {props.children}
            </div>
        </div>
    );
}

export default Popup
