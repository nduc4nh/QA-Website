import React from 'react'
import { Dropdown } from 'react-bootstrap'

import FlatListItem from './FlatListItem'

const CustomFlatList = () => {
    return (
        <div>
            <div>
                <FlatListItem name="Cras justo odio" />
                <FlatListItem name="Dapibus ac facilisis in" />
                <FlatListItem name="Morbi leo risus" />
                <FlatListItem name="Porta ac consectetur ac" />
                <FlatListItem name="Vestibulum at eros" />
                <FlatListItem name="Cras justo odio" />
                <FlatListItem name="Dapibus ac facilisis in" />
                <FlatListItem name="Morbi leo risus" />
                <FlatListItem name="Porta ac consectetur ac" />
                <FlatListItem name="Vestibulum at eros" />
                <FlatListItem name="Cras justo odio" />
                <FlatListItem name="Dapibus ac facilisis in" />
                <FlatListItem name="Morbi leo risus" />
                <FlatListItem name="Porta ac consectetur ac" />
                <FlatListItem name="Vestibulum at eros" />
            </div>
            <Dropdown.Divider />
        </div>
    )
}

export default CustomFlatList
