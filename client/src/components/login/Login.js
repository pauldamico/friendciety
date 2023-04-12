import React, { useState,  } from "react";
import NewLoginForm from "./LoginForm";
import axios from "axios";
import Auth0LoginButton from "./Auth0LoginButton";
// import Auth0LogoutButton from "./Auth0LogoutButton";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { authSlice } from "../../redux/index.js";
import { useAuth0,  } from "@auth0/auth0-react";




  const { setCurrentUser } = authSlice.actions;

  const Login =()=>{   
    const {currentUser} = useSelector(state=>state.currentUser)
    const { loginWithRedirect } = useAuth0();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginFormData, setLoginFormData] = useState({username:"", password:""})
  const [toggleSignUp, setToggleSignUp] = useState(false);
const [toggleAuthLogin, setToggleAuthLogin] = useState(false)

console.log(toggleAuthLogin)

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

  function authLoginOnClick (){
    setToggleAuthLogin(true)
    loginWithRedirect({ screen_hint: 'signup' })
  }

  return (
    <>
<Auth0LoginButton onClick={authLoginOnClick}/>
{/* <Auth0LogoutButton/> */}

{/* This is not using auth0 to login and just creates a token with jwt. */}
    {!toggleSignUp & !toggleAuthLogin? <NewLoginForm onChange={onChange} onSubmit={loginUser} loginFormData={loginFormData} toggleSignUp={toggleSignUp} toggle={toggle}/> : null}
    {toggleSignUp & !toggleAuthLogin ? <NewLoginForm onChange={onChange} onSubmit ={signUpUser} loginFormData={loginFormData} toggleSignUp={toggleSignUp} toggle={toggle}/> : null} 

    </> 
  );
}


export default Login