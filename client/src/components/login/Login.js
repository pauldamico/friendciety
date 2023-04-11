import React, { useState, useEffect } from "react";
import NewLoginForm from "./LoginForm";
import axios from "axios";

import Auth0LoginButton from "./Auth0LoginButton";
import Auth0LogoutButton from "./Auth0LogoutButton";
import Auth0Token from "./Auth0Token";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { authSlice } from "../../redux/index.js";
import Auth0ProfileInfo from "./Auth0ProfileInfo";
import { useAuth0,  } from "@auth0/auth0-react";




  const { setCurrentUser } = authSlice.actions;

  const Login =()=>{   
    const {currentUser} = useSelector(state=>state.currentUser)
    const { isAuthenticated, loginWithRedirect } = useAuth0();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginFormData, setLoginFormData] = useState({username:"", password:""})
  const [toggleSignUp, setToggleSignUp] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false)


console.log(currentUser)
  //user login
  function loginUser(event) {
event.preventDefault()
    axios
      .post("/login", loginFormData)  
      .then(res=>{
   
        localStorage.setItem("userInfo", JSON.stringify(res.data))     
      dispatch(setCurrentUser(res.data) )
      navigate("/")      
    })

      .catch((err) => console.log(err));
      setLoginFormData(prev=>({...prev, username:"", password:""}))

  }

  //signUp
  function signUpUser(event) {
    event.preventDefault()
    axios
      .post("/signup", loginFormData)
      .then(res=>{
      localStorage.setItem("userInfo", JSON.stringify(res.data))
      dispatch(setCurrentUser(res.data))
      navigate("/")
    })
      .catch((err) => console.log(err));  
      setLoginFormData(prev=>({...prev, username:"", password:""}))
  }



  function onChange(event) {
    const {name, value} = event.target;
    setLoginFormData(prev=>({...prev, [name]:value}))
  }

  function toggle (){
    setToggleSignUp(!toggleSignUp)
  }


  // useEffect(() => {
  //   if (!isAuthenticated && !isRedirecting) {
  //     setIsRedirecting(true);
  //     loginWithRedirect();
  //   }
  // }, [isAuthenticated, isRedirecting, loginWithRedirect]);
  return (
    <>
<Auth0LoginButton/>
<Auth0LogoutButton/>
{/* <Auth0Token/> */}
{/* <Auth0ProfileInfo/> */}

    {!toggleSignUp && <NewLoginForm onChange={onChange} onSubmit={loginUser} loginFormData={loginFormData} toggleSignUp={toggleSignUp} toggle={toggle}/>}



{toggleSignUp && <NewLoginForm onChange={onChange} onSubmit ={signUpUser} loginFormData={loginFormData} toggleSignUp={toggleSignUp} toggle={toggle}/>} 

    </> 
  );
}


export default Login