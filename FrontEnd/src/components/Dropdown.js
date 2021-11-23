import React from 'react'
import styled from 'styled-components'
import CustomButton from './CustomButton'
import DropdownElem from './DropdownElem'

const ListContainer = styled.div`
    background:"white"
`
const ListItem = styled.li`
    list-style: none;
    margin-bottom: 0.8em;
`
const Dropdown = ({ items }) => {
    return (
        <div style={{
            zIndex: 1,
            position: "relative",
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            boxShadow: "0px 2px 10px #d7d6d6"
        }}>
            <ListContainer>
                {items.map((item) => (
                    <CustomButton>
                        <DropdownElem item = {item} />
                    </CustomButton>))}
            </ListContainer>
        </div>
    )
}

export default Dropdown
