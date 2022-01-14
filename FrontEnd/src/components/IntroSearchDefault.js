import React from 'react'
import './css/IntroGroup.css'
import { BsSearch } from 'react-icons/bs'
import { primaryColor, primaryGrey, lightGrey } from '../constant/color'
import { Dropdown } from 'react-bootstrap'
import axios from 'axios'

const IntroSearchDefault = ({kind, query}) => {
    
    return (
        <div className='intro-box'>
            <div className='intro-content'>
                <div className='intro-icon'>
                    <BsSearch size={"150px"} color={lightGrey} />
                </div>
                <div className='intro-text'>
                    <div>
                        {`Searching results for ${kind}:`}
                    </div>
                    <div className="intro-query-name">
                        {"'" + `${query}` + "'"}
                    </div>
                </div>

            </div>

            <div className='intro-description' style={{ flex: "1" }}>

            </div>
        </div>

    )
}

export default IntroSearchDefault
