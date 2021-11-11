import React from 'react'
import { Image } from 'react-bootstrap'

const UserHeaderGroup = ({user, otherInfo}) => {
    return (
        <div style ={{display:"flex", flexDirection:"row"}}>
            <div style = {{height:"100%",alignSelf:"center"}}>
                <Image src = {user.avatar} width="40" height="40" roundedCircle/>
            </div>
            <div style = {{flex:1, marginLeft:20}}>
                <div style = {{fontWeight:"bold", fontSize:16}}>
                    {user.name}
                </div>
                {otherInfo && <div style = {{fontWeight:"normal",fontSize: 14, color:"grey"}}>
                    {otherInfo}
                </div>}
            </div>
        </div>
    )
}

export default UserHeaderGroup
