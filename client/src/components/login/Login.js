import LoginForm from "./LoginForm";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../authProvider";

export default function Login() {
  const {signUpUser, loginUser} = useContext(AuthContext)

  const [loginFormData, setLoginFormData] = useState({username:"", password:""})
  const [toggleSignUp, setToggleSignUp] = useState(false);

  function submitSignUpInfo (event){
    event.preventDefault()
    signUpUser(loginFormData)
    setLoginFormData(prev=>({...prev, username:"", password:""}))
  }

  function submitLoginInfo (event){
    event.preventDefault()
    loginUser(loginFormData)
    setLoginFormData(prev=>({...prev, username:"", password:""}))
  }

  function onChange(event) {
    const {name, value} = event.target;
    setLoginFormData(prev=>({...prev, [name]:value}))
  }

  function toggle (){
    setToggleSignUp(!toggleSignUp)
  }

  return (
    <>
      {/* login */}
      {!toggleSignUp && <LoginForm onChange={onChange} onSubmit={submitLoginInfo} loginFormData={loginFormData} toggleSignUp={toggleSignUp} toggle={toggle}/>}


      {/* signup */}
      {toggleSignUp && <LoginForm onChange={onChange} onSubmit ={submitSignUpInfo} loginFormData={loginFormData} toggleSignUp={toggleSignUp} toggle={toggle}/>}
    </>
  );
}
