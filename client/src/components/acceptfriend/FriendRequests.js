import React, {useContext, useState} from "react"
import FriendRequest from "./FriendRequest"
import { AuthContext } from "../../context/authProvider"
export default function FriendRequests (){
    const {currentUser} = useContext(AuthContext)
    const [toggle, setToggle] = useState(false)

    function toggler (){
setToggle(!toggle)
    }

    const friendRequests = currentUser?.user.friendRequest?.map((item) => <FriendRequest key={item} user={item}/>)

    return (<div> 
        <div  onClick={toggler}>   
       
{currentUser?.user.friendRequest?.length > 0 ?<section>Friend Requests <span>{currentUser?.user.friendRequest.length}</span></section>: null}
{toggle ?<div className="friend-request-div">
 {friendRequests}
</div> : null}

</div>    
    </div>)

}