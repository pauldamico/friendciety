import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authProvider";
import {People, House} from 'react-bootstrap-icons'
import {Avatar} from '@mui/material'
import WindowSize from "./WindowSize";


export default function SideBar() {
  const { currentUser, token } = useContext(AuthContext);





  return (<WindowSize arrow=">">
    <div className="sidebar-div">
      {token ? (
        <div>   

          <div className="sidebar-div2">
       
          
             
            {token ? (
            <Link to={`/profile/${currentUser?.user.username}`} className="profile-icon">
              {" "}
              <Avatar
                sx={{ width: 24, height: 24 }}
                src={require("../images/red.jpg")}
              />{" "}
              <section >{currentUser?.user.username}</section>
            </Link>            
          ) : null}
           <Link to={token ? '/' : '/login'}><House/> Home</Link> 
            <Link to="/friendfeed"><People/> Friends Posts</Link>
          </div>
        </div>
      ) : null}
    </div>
    </WindowSize>
  );
}
