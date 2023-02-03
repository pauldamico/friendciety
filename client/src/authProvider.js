import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
function AuthContextProvider(props) {
    const navigate = useNavigate()
const initValue =  JSON.parse(localStorage.getItem("userInfo"))||{token:null, user:{}}
    const [currentUser, setCurrentUser] = useState(initValue)
    const [currentError, setCurrentError] = useState("")

    //deconstruct current User
    const {token}= currentUser
    const {username, _id:userId}= currentUser.user

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
      setCurrentUser(prev=>(res.data)) })
      .catch((err) => console.log(err));  
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
  }
    //Login
    function loginUser(userInfo) {
    axios
      .post("/login", userInfo)  
      .then(res=>{localStorage.setItem("userInfo", JSON.stringify(res.data))
      setCurrentUser(prev=>(res.data)) })
      .catch((err) => console.log(err));
  }


  return (
    <AuthContext.Provider value={{userId, logout, signUpUser, loginUser, token, username }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
