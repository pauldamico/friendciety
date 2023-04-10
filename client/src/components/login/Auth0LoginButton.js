import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Auth0LoginButton = () => {


  
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);



  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-0zd4zxu226vwide7.us.auth0.com";  
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `friendciety`,
            scope: "read:current_user update:current_user_metadata openid profile email username openid id_token"
          },
        });
       console.log(user)
     
          if(user){
        const userDetailsByIdUrl = `https://dev-0zd4zxu226vwide7.us.auth0.com/api/v2/users/${user?.sub}` || null
        //
        axios
        .post("/auth0/auth0login", user, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
    console.log(res.data)
        
      
        })
        .catch((err) => console.log(err));
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,},});  
        const { user_metadata } = await metadataResponse.json();    
  
        setUserMetadata(user_metadata);}
      } catch (e) {console.log(e.message)}};  
    getUserMetadata();


  }, [getAccessTokenSilently, user?.sub, loginWithRedirect]);




  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default Auth0LoginButton;