import React, { useState, useContext } from "react";
import { AuthContext } from "../authProvider";



export default function LoginForm(props) {
  const { toggle, toggleSignUp, onSubmit } = props;
const {signUpUser} = useContext(AuthContext)
  const [loginFormData, setLoginFormData] = useState({username:"", password:""})

  function onChange(event) {
    const {name, value} = event.target;
    setLoginFormData(prev=>({...prev, [name]:value}))
  }

  function submitUserInfo (event){
    event.preventDefault()
    signUpUser(loginFormData)
    setLoginFormData(prev=>({...prev, username:"", password:""}))
  }

 
  return (
    <div className="login-div">
      <div>
        <form className="login-form" onSubmit={submitUserInfo}>
          <label>Username</label>
          <input name="username" value={loginFormData.username} onChange={onChange} type="text" />
          <label>Password</label>
          <input name="password" value={loginFormData.password} onChange={onChange} type="password" autoComplete="false"/>
          <button>{toggleSignUp ? `Create Account` : `Login`}</button>
          {!toggleSignUp && (
            <h4 type="onClick" onClick={toggle}>
              Don't have an account? Click Here
            </h4>
          )}
          <div></div>
          {toggleSignUp && (
            <h4 type="onClick" onClick={toggle}>
              Go back to Login
            </h4>
          )}
        </form>
      </div>
    </div>
  );
}
