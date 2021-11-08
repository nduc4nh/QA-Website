import React from 'react'
import { Dropdown } from 'react-bootstrap'

import FlatListItem from './FlatListItem'

const CustomFlatList = ({users}) => {
    console.log(users);
    return (
        <div>
            <div>
                {users.map((item) => (<FlatListItem user={item} />))}
            </div>
            <Dropdown.Divider />
        </div>
    )
}

export default CustomFlatList
