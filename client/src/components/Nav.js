import { Link,useNavigate  } from "react-router-dom";
import ChatDrawer from "./chat/ChatDrawer";
import { useSelector, useDispatch } from "react-redux";
import Auth0LogoutButton from "./login/Auth0LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import {  authSlice,  postsSlice, repliesSlice, friendsSlice, commentsSlice, messagesSlice} from "../redux";
import WindowSize from "./WindowSize";
import FriendRequests from "./acceptfriend/FriendRequests";
import AllUsers from "./searchusers/AllUsers";
import BasicMenu from "./MUI/BasicMenu";
import { Avatar } from "@mui/material";


const { resetCurrentUser } = authSlice.actions;
const { resetPosts } = postsSlice.actions;
const { resetComments } = commentsSlice.actions;
const { resetReplies } = repliesSlice.actions;
const { resetFriends } = friendsSlice.actions;
const {resetMessages} = messagesSlice.actions;


export default function Nav() {
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
