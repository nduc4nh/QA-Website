import React from 'react'
import './css/FlatListItem.css'

const FlatListItem = ({ name }) => {
    const onClickItem = () =>{
        console.log("abc");
    }

    return (
        <div
            onClick={onClickItem}
            className='container-item'>
            <div className='icon'>
                <img src = {"sc"}/>
            </div>
            <div className='name'>
                {name}
            </div>

        </div>
    )
}

export default FlatListItem
