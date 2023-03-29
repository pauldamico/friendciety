import React, {useContext } from "react";
import Feed from './components/Feed'
import Nav from "./components/Nav";
import Login from "./components/login/Login";
import Profile from "./components/Profile";
import SideBar from "./components/SideBar";
import "./App.css";
import { Routes, Route} from "react-router-dom";
import { AuthContext } from "./context/authProvider";
import { PostContext } from "./context/postProvider";
function App() {

  const { currentUser, token } = useContext(AuthContext);
const {myFeed} = useContext(PostContext)

const allPosts = myFeed?.sort((a,b)=>a.postOrder - b.postOrder) || []
// const currentUserPosts = myFeed?.filter(post=>post.userId === currentUser.user._id) || []
const friendsPosts = myFeed?.filter(post=>post.userId !== currentUser.user._id) || []

  return (
    <div className="app">
      <Nav />
      <SideBar />
      <Routes>
        <Route path="/" element={token ? <Feed user={currentUser.user.username} feed={allPosts} /> : <Login />} />
        <Route path="/profile/:userprofile" element={token ? <Profile  /> : <Login />} />
    
        {/* <Route path="/myfeed" element={token ? <Feed feed={currentUserPosts} /> : <Login />} /> */}
        <Route path="/friendfeed" element={token ? <Feed feed={friendsPosts} /> : <Login />} />
        <Route path="/login" element={!token ? <Login /> : <Feed />} />
      </Routes>
    </div>
  );
}

export default App;
