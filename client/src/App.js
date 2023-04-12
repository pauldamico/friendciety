import React, {useEffect} from "react";
import Feed from './components/Feed'
import Nav from "./components/Nav";
import Login from "./components/login/Login";
import Profile from "./components/Profile";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import Auth0Loading from "./components/login/Auth0Loading";
import "./App.css";
import { Routes, Route} from "react-router-dom";
import { useSelector} from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";



function App() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const {currentUser} = useSelector((state)=>state.currentUser)
  // const {friends} = useSelector((state)=>state.friends)
  const {posts} = useSelector(state=>state.posts) || ""
const allPosts = posts.map(post=>post).sort((a,b)=>a.postOrder - b.postOrder) || []
const friendsPosts = posts?.filter(post=>post.userId !== currentUser.user._id) || []
console.log(process.env.REACT_APP_AUTH0_AUDIENCE)

console.log(process.env.REACT_APP_AUTH0_DOMAIN)
console.log(process.env.REACT_APP_AUTH0_CLIENT_ID)
console.log(process.env.REACT_APP_AUTH0_REDIRECT_URI)
console.log(process.env.REACT_APP_AUTH0_DOMAIN)
console.log(process.env.REACT_APP_AUTH0_DOMAIN)


  return (
    <div className="app"> 
      <Nav />
      {currentUser.token ?  <LeftSide /> : null}
      {currentUser.token ?  <RightSide /> : null}
      <Routes>
      <Route path="/auth0loading" element={currentUser.token ? <Feed user={currentUser.user.username} feed={allPosts} /> : <Auth0Loading/>} />
        <Route path="/" element={currentUser.token ? <Feed user={currentUser.user.username} feed={allPosts} /> : <Login/>} />
        <Route path="/profile/:userprofile" element={currentUser.token ? <Profile  /> : <Login />} />     
        <Route path="/friendfeed" element={currentUser.token ? <Feed feed={friendsPosts} /> : <Login />} />
        <Route path="/login" element={!currentUser.token ? <Login /> : <Feed />} />
      </Routes>
    </div>
  );
}

export default App;
