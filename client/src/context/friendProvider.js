import React,{useState, createContext, useContext} from "react"
import axios from "axios"
import { AuthContext } from "./authProvider"

const FriendContext = createContext()
function FriendContextProvider (props){
const {loginUser, signUpuser, resetSearch, config, token} = useContext(AuthContext)
    const [friends, setFriends] = useState({friends:[], friendRequest:[], pendingRequest:[], username:"", _id:"", userId:""})
    
// function friendRequest (selectedUser){   
    
//     axios.put(`/auth/friends/addfriend`, {user:selectedUser}, config)
//     .then(res=>{console.log(res.data)
//       setFriends(prev=>({...prev,  pendingRequest:[...prev.pendingRequest, res.data]})) 
//       resetSearch()
//     })
//     .catch(err=>console.log(err))
//   }

//   //Accept friend request or add friend
// function acceptFriendRequest (addedUser){
//   console.log(addedUser)
//     axios.put('/auth/friends/acceptfriend', {user:addedUser}, config)
//     .then(res=>{
//       console.log(res.data)
//       setFriends(prev=>({...prev,  friends:[...prev.friends, res.data], friendRequest:prev.friendRequest.filter(item=>item !== addedUser )} ))
//       refreshFriendData ()
//     })
//     }
//     //Decline friend request or add friend
//     function declineFriendRequest (declinedUser){
//       axios.delete('/auth/friends/declinefriend', { data:{user:declinedUser}, headers:{Authorization: `Bearer ${token}`}})
//       .then(res=>{
//         setFriends(prev=>({...prev, user:{...prev.user, friendRequest:prev.user.friendRequest.filter(item=>item !== declinedUser )} }))
//         console.log(res.data)
//         refreshFriendData ()
//       })
//       console.log(config)
//       }

       //refreshes friend data
  // function refreshFriendData (){   
  //   axios.get('/auth/friends/friends', config)    
  //   .then(res=>{
  //     setFriends(prev=>({...prev, ...res.data}))    
  //   })}

  // useState(()=>{
  //  token && refreshFriendData ()
  // }, [loginUser, signUpuser ])
    

return(
    <FriendContext.Provider value={{friends,}}>
{props.children}
    </FriendContext.Provider>
)
}


export {FriendContext, FriendContextProvider}
