import React, {useContext} from "react"
import { AuthContext } from "../../authProvider"

export default function FriendRequest (props){
const {declineFriendRequest, acceptFriendRequest} = useContext(AuthContext)


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