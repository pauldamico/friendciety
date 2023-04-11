import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { authSlice } from "../../redux/index.js";

const { setCurrentUser } = authSlice.actions;

const Auth0LoginButton = () => {


  
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [redirecting, setRedirecting] = useState(false)

 useEffect(() => {

    const getUserMetadata = async () => {
      const domain = "dev-0zd4zxu226vwide7.us.auth0.com";
  
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `friendciety`,
            scope: "read:current_user update:current_user_metadata openid profile email username openid"
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;  
        axios
        .post("/auth0/auth0login", user, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res.data))     
          dispatch(setCurrentUser(res.data) )
          setRedirecting(true)
          navigate("/")    
 
      
        })
        .then(()=>{setRedirecting(false)})
        .catch((err) => console.log(err));
        
        
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
  
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();

  }, [getAccessTokenSilently, user?.sub]);






  return <button onClick={() => loginWithRedirect()}>Log In With Auth 0</button>;
};

export default Auth0LoginButton;