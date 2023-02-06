import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
function AuthContextProvider(props) {
 
    const navigate = useNavigate()
const initValue =  JSON.parse(localStorage.getItem("userInfo"))||{token:null, user:{}}
    const [currentUser, setCurrentUser] = useState(initValue)
    const [currentError, setCurrentError] = useState("")
    const [allUsers, setAllUsers] = useState([])

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
      pullAllUsers()
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
      pullAllUsers()
    })
      .catch((err) => console.log(err));
  }

  function pullAllUsers (){
    axios.get('/auth/allusers', config)
    .then(res=>setAllUsers(res.data))
  }
  function getListOfAllUsers (filter){
  setAllUsers(prev=>prev.filter(user=>user.includes(filter)))
  }

  useEffect(()=>{
    console.log("test")
   token && pullAllUsers()
  }, [])

  return (
    <AuthContext.Provider value={{currentUser, userId, logout, signUpUser, loginUser, token, username, getListOfAllUsers, allUsers }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
