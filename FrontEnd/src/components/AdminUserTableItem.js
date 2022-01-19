import { React, useState } from 'react'
import './css/base.css';
import './css/User.css';
import { AiOutlineSearch } from 'react-icons/ai';
import CustomButton from './CustomButton';

const AdminUserTableItem = ({ id, name, avatar, status, onChoose, setChecked }) => {
    const [chosen, setChosen] = useState(false);
    
    const onChecked = (e) =>{
        if (e.target.checked) setChecked(prev => [...prev,id])
        else setChecked(prev => prev.filter((item) => (item === id)))
    }

    return (

        <div class="grid__row" >
            <div class="grid__column-2-product" style={{ display: "flex", justifyContent: "center" }}>
                <input type="checkbox" name="sport" value="Checkbox" onChange={onChecked}></input>
            </div>
            <div class="grid__column-2-product">
                <span className="id">{id}</span>
            </div>
            <div class="grid__column-2-product">
                <span className="name">{name}</span>
            </div>
            <div class="grid__column-2-product">
                <span className="id">{avatar}</span>
            </div>
            <div class="grid__column-2-product" style={{ display: "flex", justifyContent: "center" }} onClick={onChoose}>
                <AiOutlineSearch />
            </div>

        </div>

    );
}


export default AdminUserTableItem