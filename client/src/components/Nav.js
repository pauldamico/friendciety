import React,{useEffect} from "react";
import { Link,useNavigate  } from "react-router-dom";
import ChatDrawer from "./chat/ChatDrawer";
import { useSelector, useDispatch } from "react-redux";
import Auth0LogoutButton from "./login/Auth0LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import {  authSlice,  postsSlice, repliesSlice, friendsSlice, commentsSlice, messagesSlice,} from "../redux";
import WindowSize from "./WindowSize";
import FriendRequests from "./acceptfriend/FriendRequests";
import AllUsers from "./searchusers/AllUsers";
import BasicMenu from "./MUI/BasicMenu";
import { Avatar } from "@mui/material";
import { io } from "socket.io-client";
import { ApiCalls } from "./ApiCalls";


const { resetCurrentUser } = authSlice.actions;
const { resetPosts } = postsSlice.actions;
const { resetComments } = commentsSlice.actions;
const { resetReplies } = repliesSlice.actions;
const {resetFriends } = friendsSlice.actions;
const {resetMessages} = messagesSlice.actions;



export default function Nav() {  
  const {getAllUsers, getFriends} = ApiCalls()
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.currentUser);
  const { token } = currentUser || null;

  
  function logoff() {
    localStorage.clear();
    dispatch(resetCurrentUser());
    dispatch(resetComments());
    dispatch(resetPosts());
    dispatch(resetReplies());
    dispatch(resetFriends());
    dispatch(resetMessages())  
    return navigate("/Login");
    // resetSearch()
  }


  useEffect(() => {
   
    // Connect to the server using socket.io-client
    const userSocket = io('http://localhost:4000/user', {auth:{username:currentUser.user.username, token:token}});

    // Join the user's room
    userSocket.emit('joinRoom',`notifications_${currentUser.user.username}`);

    // Listen for incoming messages
    userSocket.on('notification', (data) => {
      console.log(data)
      console.log("abc")
      // Update the state with the new message
      getAllUsers()
   getFriends()
    });

    // Clean up the userSocket connection when the component unmounts

  }, []);


  return (
    <div>          
      {token ? (
        <div className="nav-div">
      
          <WindowSize arrow="<">
            {" "}
            <BasicMenu />
          </WindowSize>
          <WindowSize arrow=">">
          {token ? (
            <Link style={{left:"1vw"}} to={`/profile/${currentUser?.user.username}`} className="profile-icon">
              {" "}
              <Avatar
                sx={{ width: 24, height: 24 }}
                src={require("../images/red.jpg")}
              />
              
              {" "}
              <section >{currentUser?.user.username.split("@")[0]}</section>
            </Link>            
          ) : null} 
          </WindowSize>
          {token ? (
            <div className="nav-div-div">
           
             
              {!token ? (
                <Link to="/login"> Login</Link>
              ) : (
                <div className="logout-div">
                   {token ? <FriendRequests /> : null}
                   {token ? 
              <AllUsers /> 
              : null}
                  <ChatDrawer />
               { !isAuthenticated  ? <h3 onClick={logoff}>
                    {" "}
                    <img
                      alt=""
                      height="15px"
                      width="15px"
                      src={require("../images/logout.png")}
                    />
                    Logout
                  </h3> 
                  :
                  <Auth0LogoutButton logoff={logoff}/> }
                </div>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
