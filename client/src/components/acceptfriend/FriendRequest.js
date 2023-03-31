import React, {useContext} from "react"
import { FriendContext } from "../../context/friendProvider"

export default function FriendRequest (props){
const {declineFriendRequest, acceptFriendRequest} = useContext(FriendContext)

function accept (){
    acceptFriendRequest(props.user)
}

function decline (){
    declineFriendRequest(props.user)
}

    return (<div className="friend-request">
{props.user} <span style={{cursor:"pointer"}} onClick={accept}>
    
    Add
    
    </span><span style={{color:"red", cursor:"pointer"}} onClick ={decline}>X</span>
    </div>)
}