import React from 'react'
import './css/FlatListItem.css'
import { Image } from 'react-bootstrap'
const FlatListItem = ({ user }) => {
    const onClickItem = () =>{
        console.log("abc");
    }
    console.log(user);

    return (
        <div
            onClick={onClickItem}
            className='container-item'>
            <div className='icon'>
                <Image src = {user.avatar} roundedCircle/>
            </div>
            <div className='name'>
                {user.name}
            </div>

        </div>
    )
}

export default FlatListItem
