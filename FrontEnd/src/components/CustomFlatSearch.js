import React from 'react'
import { Dropdown } from 'react-bootstrap'

import FlatListItem from './FlatListItem'

const CustomFlatSearch = () => {
    return (
        <div className="FlatList-list">
            By Type
            <Dropdown.Divider />
            <div >
                <FlatListItem name="All types" />
                <FlatListItem name="Questions" />
                <FlatListItem name="Answers" />
                <FlatListItem name="Pots" />
                <FlatListItem name="Profiles" />
                <FlatListItem name="Topics" />
                
            </div>
            <Dropdown.Divider />
            By author
            <Dropdown.Divider />
            <div >
                <FlatListItem name="All people" />
                <FlatListItem name="People you follow" />
                
            </div>
            <Dropdown.Divider />
        </div>
    )
}

export default CustomFlatSearch