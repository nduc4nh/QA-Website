import { React, useState } from 'react'

import './css/base.css';
import './css/User.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { truncate } from '../utils/StringProcessing';
const AdminPostTableItem = ({ id, title, date, likes, dislikes, view, setChecked }) => {
    const [chosen, setChosen] = useState(false);
    const onChecked = (e) =>{
        if (e.target.checked) setChecked(prev => [...prev,id])
        else setChecked(prev => prev.filter((item) => (item === id)))
    }

    return (

        <div class="grid__row">
            <div class="grid__column-2-product" style={{display:"flex", justifyContent:"center"}}>
                <input type="checkbox" name="sport" value="Checkbox" onChange={onChecked}></input>
            </div>
            <div class="grid__column-2-product">
                <span className="number">{truncate(id,10) }</span>
            </div>
            <div class="grid__column-2-product">
                <span className="name">{title}</span>
            </div>
            <div class="grid__column-2-product">
                <span className="avatar">{date}</span>
            </div>
            <div class="grid__column-2-product">
                <span className="status">{likes}</span>
            </div>
            <div class="grid__column-2-product">
                <span className="status">{dislikes}</span>
            </div>
            <div class="grid__column-2-product">
                <span className="status">{view}</span>
            </div>
            
            <div class="grid__column-2-product" style={{display:"flex", justifyContent:"center"}}>
                <AiOutlineSearch />
            </div>
        </div>

    );
}

export default AdminPostTableItem
