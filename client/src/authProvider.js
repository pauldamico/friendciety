import React, { useState, createContext, useEffect } from "react";
import axios from "axios";


const AuthContext = createContext();
function AuthContextProvider(props) { 
 
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
    }

    //signUp
    function signUpUser(userInfo) {
    axios
      .post("/signup", userInfo)
      .then(res=>{localStorage.setItem("userInfo", JSON.stringify(res.data))
      setCurrentUser(prev=>(res.data)) 
      getAllUsers()
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
    })
      .catch((err) => console.log(err));
  }
// need to run this after adding friends or removing friends
  function getAllUsers (){
    axios.get('/auth/allusers', config)
    .then(res=>setAllUsers(res.data))    
  }

  //refreshes user info
  function refreshPage (){
    console.log(currentUser.user)
    axios.get('/auth/currentuser', config)    
    .then(res=>setCurrentUser(prev=>({...prev, user:{...res.data}})))
  }

  //gets list of searchable users
  function getListOfAllUsers (filter){
  setSearch(filter)
  }

// send friend request to selected user
function friendRequest (selectedUser){   
  axios.put(`/auth/addfriend`, {user:selectedUser}, config)
  .then(res=>{console.log(res.data)
    setCurrentUser(prev=>({...prev, user:{...prev.user, pendingRequest:[...res.data]}})) 
   console.log(currentUser)
  })
  .catch(err=>console.log(err))

}

  useEffect(()=>{
       token && getAllUsers()
       token && refreshPage()
  }, [])

  return (
    <AuthContext.Provider value={{getAllUsers, search, currentUser, userId, logout, signUpUser, loginUser, token, username, getListOfAllUsers, allUsers,  friendRequest }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
// const currentFriends = currentUser?.user?.friends?.filter(item=>allUsers?.indexOf(item)===-1 ).map(item=><p key={item.id}>{item.user}</p>)
