import React from 'react'
import { Dropdown } from 'react-bootstrap'

import FlatListItem from './FlatListItem'
import { useNavigate } from 'react-router'

const CustomFlatList = ({ items, controlVar }) => {
    const navigate = useNavigate()
    const navigateToQueryPage = (i) =>{
        const func = () =>{
            navigate(`/questions/category/${controlVar[i]}`)
        }
        return func
    }
    return (
        <div className="FlatList-list">
            <div >
                {items.map((item, i) => (<div>
                    <FlatListItem name={item} onChoose={navigateToQueryPage(i)}/>
                    <Dropdown.Divider />
                </div>))}
            </div>
            
        </div>
    )
}

export default CustomFlatList
