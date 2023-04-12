import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { authSlice, loadingSlice } from "../../redux/index.js";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const { setCurrentUser } = authSlice.actions;
const { setLoading } = loadingSlice.actions;

const Auth0Loading = () => {

const {loading} = useSelector(state=>state.loading)  
  const { user, isAuthenticated, getAccessTokenSilently, } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [redirecting, setRedirecting] = useState(false)

 useEffect(() => {
if(isAuthenticated){
dispatch(setLoading(true))
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `friendciety`,
            scope: process.env.REACT_APP_AUTH0_SCOPE
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
      
        })
        .then(()=>{return setRedirecting(false)})
        .then(()=>{
          console.log("test")
        })
        .then(()=>{
            dispatch(setLoading(false))
            return  navigate("/")    })

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
  
    getUserMetadata();}

  }, [getAccessTokenSilently, user?.sub]);



return(<>
 <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading}

>
  <CircularProgress color="inherit" />
</Backdrop>
</>)

}

export default Auth0Loading