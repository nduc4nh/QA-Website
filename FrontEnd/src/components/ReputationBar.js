import React from 'react'
import { BiUpvote, BiDownvote } from 'react-icons/bi'

const ReputationBar = ({upvotes, downvotes}) => {
    return (
        <div style = {{display:"flex", flexDirection:"row"}}>
            <div style = {{display:"flex", flexDirection:"row"}}>
                <BiUpvote size={30} color="#757575" lightingColor="red" />
                <div style = {{fontSize:20, color:"#757575"}}>{upvotes}</div>
            </div>
            <div style = {{marginLeft:"10%",display:"flex", flexDirection:"row"}}>
                <BiDownvote size={30} color="#757575"/>
                <div style = {{fontSize:20,color:"#757575"}} >{downvotes}</div>
            </div>
        </div>
    )
}

export default ReputationBar
