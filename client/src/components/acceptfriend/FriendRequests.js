import React, {useContext, useState} from "react"
import FriendRequest from "./FriendRequest"
import { AuthContext } from "../../context/authProvider"
import {Badge} from '@mui/material'
export default function FriendRequests (){
    const {currentUser} = useContext(AuthContext)
    const [toggle, setToggle] = useState(false)

    function toggler (){
setToggle(!toggle)
    }

    const friendRequests = currentUser?.user.friendRequest?.map((item) => <FriendRequest key={item} user={item}/>)

    return (<div style={{position:"absolute", left:"50vw"}}> 
        <div  onClick={toggler}>   
       
{currentUser?.user.friendRequest?.length > 0 ?<section style={{display:"flex", alignItems:"center", cursor:"pointer" }}><Badge badgeContent={currentUser?.user.friendRequest.length} color="primary"><img height="20px" width="20px" src={require('../../images/addFriend.png')}/></Badge> </section>: null}
{toggle ?<div className="friend-request-div">
 {friendRequests}
</div> : null}

</div>    
    </div>)

}