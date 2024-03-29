import React from "react";
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




function App() {
const {currentUser} = useSelector((state)=>state.currentUser)
const {posts} = useSelector(state=>state.posts) || ""
const allPosts = posts.map(post=>post).sort((a,b)=>a.postOrder - b.postOrder) || []
const friendsPosts = posts?.filter(post=>post.userId !== currentUser.user._id) || []



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
