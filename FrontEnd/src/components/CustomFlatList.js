import React from 'react'
import { Dropdown } from 'react-bootstrap'

import FlatListItem from './FlatListItem'

const CustomFlatList = () => {
    return (
        <div className="FlatList-list">
            <Dropdown.Divider />
            <div >
                <FlatListItem name="Questions" />
                <FlatListItem name="Tags" />
                <FlatListItem name="Users" />
                <FlatListItem name="Language" />
                <FlatListItem name="Movie" />
                <FlatListItem name="Science" />
                <FlatListItem name="Dapibus ac facilisis in" />
                
            </div>
            <Dropdown.Divider />
        </div>
    )
}

export default CustomFlatList
