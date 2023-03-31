import React, { useState, createContext, useEffect } from "react";
import io from 'socket.io-client'
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

    // const socket = io("http://localhost:4000");

    //deconstruct current User
    const {token}= currentUser
    //header for axios 
    const config = {headers:{Authorization: `Bearer ${token}`}}

    //logout
    function logout (){
    localStorage.clear()
    setCurrentUser(prev=>({...prev, token:null, user:{}}))  
    resetSearch()
    }

    //signUp
    function signUpUser(userInfo) {
    axios
      .post("/signup", userInfo)
      .then(res=>{localStorage.setItem("userInfo", JSON.stringify(res.data))
      setCurrentUser(prev=>(res.data))   
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
      navigate("/")
    })
      .catch((err) => console.log(err));
  }
// need to run this after adding friends or removing friends    check this may not need it
  function getAllUsers (){
    axios.get('/auth/allusers', config)
    .then(res=>{      
      setAllUsers(res.data)
    })     
  } 

  //gets list of searchable users
  function getListOfAllUsers (filter){
  setSearch(filter)
  }

  //resets the text in search users
  function resetSearch (){
    setSearch("") 
  }


  return (
    <AuthContext.Provider value={{resetSearch, config, getAllUsers, search, currentUser, logout, signUpUser, loginUser, token, getListOfAllUsers, allUsers}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
// const currentFriends = currentUser?.user?.friends?.filter(item=>allUsers?.indexOf(item)===-1 ).map(item=><p key={item.id}>{item.user}</p>)
