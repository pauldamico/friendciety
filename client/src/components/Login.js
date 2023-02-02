import LoginForm from "./LoginForm";
import React, { useState } from "react";

export default function Login() {
  const [toggleSignUp, setToggleSignUp] = useState(false);

  function toggle (){
    setToggleSignUp(!toggleSignUp)
  }

  console.log(toggleSignUp)
  return (
    <>
      {/* login */}
      {!toggleSignUp && <LoginForm toggleSignUp={toggleSignUp} toggle={toggle}/>}


      {/* signup */}
      {toggleSignUp && <LoginForm toggleSignUp={toggleSignUp} toggle={toggle}/>}
    </>
  );
}
