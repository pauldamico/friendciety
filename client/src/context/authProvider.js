import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();
function AuthContextProvider(props) { 
 const navigate = useNavigate()
    const initValue =  JSON.parse(localStorage.getItem("userInfo"))||{token:null, user:{}}
    const [currentUser, setCurrentUser] = useState(initValue)
    // const [currentError, setCurrentError] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [search, setSearch] = useState("")

  

    //deconstruct current User
    const {token}= currentUser
    const {username, _id:userId}= currentUser.user

    const config = {headers:{Authorization: `Bearer ${token}`}}

    //logout
    function logout (){
    localStorage.clear()
    setCurrentUser(prev=>({...prev, token:null, user:{}}))  
    setSearch("") 
    }

    //signUp
    function signUpUser(userInfo) {
    axios
      .post("/signup", userInfo)
      .then(res=>{localStorage.setItem("userInfo", JSON.stringify(res.data))
      setCurrentUser(prev=>(res.data)) 
      getAllUsers()
      navigate("/")
    })
      .catch((err) => console.log(err));  
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
  }
    //Login
    function loginUser(userInfo) {
    axios
      .post("/login", userInfo)  
      .then(res=>{localStorage.setItem("userInfo", JSON.stringify(res.data))
      setCurrentUser(prev=>(res.data))
      getAllUsers()
      navigate("/")
    })
      .catch((err) => console.log(err));
  }
// need to run this after adding friends or removing friends    check this may not need it
  function getAllUsers (){
    axios.get('/auth/allusers', config)
    .then(res=>{      
      setAllUsers(res.data)})    
 
  }

  //refreshes user info
  function refreshPage (){   
    axios.get('/auth/currentuser', config)    
    .then(res=>{
      console.log(res.data)
      setCurrentUser(prev=>({...prev, user:{...res.data.user}    
    }))  
   localStorage.setItem("userInfo", JSON.stringify(res.data))
    }
  )

  
  }

  //gets list of searchable users
  function getListOfAllUsers (filter){
  setSearch(filter)
  }

// send friend request to selected user
function friendRequest (selectedUser){   
  console.log("test")
  axios.put(`/auth/addfriend`, {user:selectedUser}, config)
  .then(res=>{console.log(res.data)
    setCurrentUser(prev=>({...prev, user:{...prev.user, pendingRequest:[...prev.user.pendingRequest, res.data]}})) 
    setSearch("") 
  })
  .catch(err=>console.log(err))
}

//Accept friend request or add friend
function acceptFriendRequest (addedUser){
axios.put('/auth/acceptfriend', {user:addedUser}, config)
.then(res=>{
  setCurrentUser(prev=>({...prev, user:{...prev.user, friends:[...prev.user.friends, res.data], friendRequest:prev.user.friendRequest.filter(item=>item !== addedUser )} }))
  refreshPage ()
})
}
//Decline friend request or add friend
function declineFriendRequest (declinedUser){
  axios.delete('/auth/declinefriend', { data:{user:declinedUser}, headers:{Authorization: `Bearer ${token}`}})
  .then(res=>{
    setCurrentUser(prev=>({...prev, user:{...prev.user, friendRequest:prev.user.friendRequest.filter(item=>item !== declinedUser )} }))
    console.log(res.data)
    refreshPage ()
  })
  console.log(config)
  }

  useEffect(()=>{
       token && getAllUsers()
      //  token && refreshPage()
  }, [])

  return (
    <AuthContext.Provider value={{declineFriendRequest, acceptFriendRequest, getAllUsers, search, currentUser, userId, logout, signUpUser, loginUser, token, username, getListOfAllUsers, allUsers,  friendRequest }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
// const currentFriends = currentUser?.user?.friends?.filter(item=>allUsers?.indexOf(item)===-1 ).map(item=><p key={item.id}>{item.user}</p>)
