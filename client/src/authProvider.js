import React, {useState, createContext, useEffect} from "react";
import axios from "axios";

const AuthContext = createContext()
function AuthContextProvider (props){

function signUpUser (userInfo){
    axios.post("/signup", userInfo)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
   console.log(userInfo)
}





return(
    <AuthContext.Provider value={{signUpUser}}>

{props.children}
    </AuthContext.Provider>
)
}


export {AuthContext, AuthContextProvider}