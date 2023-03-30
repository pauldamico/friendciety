import React,{useState, createContext, useContext} from "react"
import axios from "axios"
import { AuthContext } from "./authProvider"

const FriendContext = createContext()
function FriendContextProvider (props){
const {resetSearch, config, token} = useContext(AuthContext)
    const [friends, setFriends] = useState({friends:[], friendRequest:[], pendingRequest:[], username:"", _id:"", userId:""})

// send friend request to selected user
function friendRequest (selectedUser){   
    console.log("test")
    axios.put(`/auth/addfriend`, {user:selectedUser}, config)
    .then(res=>{console.log(res.data)
      setFriends(prev=>({...prev, user:{...prev.user, pendingRequest:[...prev.user.pendingRequest, res.data]}})) 
      resetSearch()
    })
    .catch(err=>console.log(err))
  }

  //Accept friend request or add friend
function acceptFriendRequest (addedUser){
    axios.put('/auth/acceptfriend', {user:addedUser}, config)
    .then(res=>{
      setFriends(prev=>({...prev, user:{...prev.user, friends:[...prev.user.friends, res.data], friendRequest:prev.user.friendRequest.filter(item=>item !== addedUser )} }))
      refreshPage ()
    })
    }
    //Decline friend request or add friend
    function declineFriendRequest (declinedUser){
      axios.delete('/auth/declinefriend', { data:{user:declinedUser}, headers:{Authorization: `Bearer ${token}`}})
      .then(res=>{
        setFriends(prev=>({...prev, user:{...prev.user, friendRequest:prev.user.friendRequest.filter(item=>item !== declinedUser )} }))
        console.log(res.data)
        refreshPage ()
      })
      console.log(config)
      }

       //refreshes user info
  function refreshPage (){   
    axios.get('/auth/currentuser', config)    
    .then(res=>{
      console.log(res.data)
      setFriends(prev=>({...prev, user:{...res.data.user}    
    }))  
   localStorage.setItem("userInfo", JSON.stringify(res.data))
    }
  )  
  }
    

return(
    <FriendContext.Provider value={{friends, friendRequest, declineFriendRequest, acceptFriendRequest}}>
{props.children}
    </FriendContext.Provider>
)
}


export {FriendContext, FriendContextProvider}
