import NewLoginForm from "./LoginForm";
import axios from "axios";
import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { authSlice } from "../../redux/index.js";

  const { setCurrentUser } = authSlice.actions;

  const Login =()=>{   
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginFormData, setLoginFormData] = useState({username:"", password:""})
  const [toggleSignUp, setToggleSignUp] = useState(false);



  //user login
  function loginUser(event) {
event.preventDefault()
    axios
      .post("/login", loginFormData)  
      .then(res=>{localStorage.setItem("userInfo", JSON.stringify(res.data))     
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



  // function submitLoginInfo (event){
  //   event.preventDefault()
  //   loginUser(loginFormData)
  //   setLoginFormData(prev=>({...prev, username:"", password:""}))
  // }

  function onChange(event) {
    const {name, value} = event.target;
    setLoginFormData(prev=>({...prev, [name]:value}))
  }

  function toggle (){
    setToggleSignUp(!toggleSignUp)
  }

  return (
    <>


    {!toggleSignUp && <NewLoginForm onChange={onChange} onSubmit={loginUser} loginFormData={loginFormData} toggleSignUp={toggleSignUp} toggle={toggle}/>}


{/* signup */}
{toggleSignUp && <NewLoginForm onChange={onChange} onSubmit ={signUpUser} loginFormData={loginFormData} toggleSignUp={toggleSignUp} toggle={toggle}/>}

    </> 
  );
}


export default Login