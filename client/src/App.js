import React, {useContext } from "react";
import Feed from './components/Feed'
import Nav from "./components/Nav";
import Login from "./components/login/Login";
import Profile from "./components/Profile";
import SideBar from "./components/SideBar";
import "./App.css";
import { Routes, Route} from "react-router-dom";
import { PostContext } from "./context/postProvider";
import { useSelector } from "react-redux";
function App() {

  // const { currentUser, token } = useContext(AuthContext); 
  const {currentUser} = useSelector((state)=>state.currentUser)
  const {posts} = useSelector(state=>state.posts) || ""
const allPosts = posts.map(post=>post).sort((a,b)=>a.postOrder - b.postOrder) || []
const friendsPosts = posts?.filter(post=>post.userId !== currentUser.user._id) || []
console.log(currentUser)
  return (
    <div className="app">
      <Nav />
      <SideBar />
      <Routes>
        <Route path="/" element={currentUser.token ? <Feed user={currentUser.user.username} feed={allPosts} /> : <Login/>} />
        <Route path="/profile/:userprofile" element={currentUser.token ? <Profile  /> : <Login />} />
    
        {/* <Route path="/myfeed" element={currentUser.token ? <Feed feed={currentUserPosts} /> : <Login />} /> */}
        <Route path="/friendfeed" element={currentUser.token ? <Feed feed={friendsPosts} /> : <Login />} />
        <Route path="/login" element={!currentUser.token ? <Login /> : <Feed />} />
      </Routes>
    </div>
  );
}

export default App;
