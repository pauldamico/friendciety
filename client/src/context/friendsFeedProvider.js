import React, {useState, useEffect, createContext, useContext} from "react";
import axios from "axios";
import { AuthContext } from "./authProvider";

const FriendsFeedContext = createContext()
function FriendsFeedContextProvider (props){
const {userId, token, logout, currentUser, signUpUser, loginUser} = useContext(AuthContext) 

//Header Info for Axios users authentication
const config = {headers:{Authorization: `Bearer ${token}`}}

//State for myFeed array and state for addToFeed which is any new post change handler
    const [friendsFeed, setFriendsFeed] = useState([]);
    const [addToFeed, setAddToFeed] = useState({ post: "" }); 


  function getFriendsFeed (){    
    setFriendsFeed([])
    token && axios.get(`/auth/friendsFeed/${currentUser.user._id}`, config)    
    .then((res) =>{ setFriendsFeed(prev=>(res.data))
    console.log(res.data)
    })
    .catch(err=>console.log(err));      
  }


useEffect(()=>{
  getFriendsFeed()
}, [signUpUser, loginUser])

    return(
        <FriendsFeedContext.Provider value={{friendsFeed}}>
{props.children}
        </FriendsFeedContext.Provider>
    )
}


export {FriendsFeedContext, FriendsFeedContextProvider}
