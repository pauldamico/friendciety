import React, { useState, useContext } from "react";
import Feed from './components/Feed'
import Nav from "./components/Nav";
import Login from "./components/login/Login";
import Home from "./components/Home";
import SideBar from "./components/SideBar";

import "./App.css";

import { Routes, Route} from "react-router-dom";
import { AuthContext } from "./context/authProvider";
import { MyFeedContext } from "./context/myFeedProvider";
function App() {

  const { currentUser, token } = useContext(AuthContext);
const {myFeed} = useContext(MyFeedContext)

const allPosts = myFeed?.sort((a,b)=>a.postOrder - b.postOrder) || []
const currentUserPosts = myFeed?.filter(post=>post.userId === currentUser.user._id) || []
const friendsPosts = myFeed?.filter(post=>post.userId !== currentUser.user._id) || []



  return (
    <div className="app">
      <Nav />
      <SideBar />
      <Routes>
        <Route path="/" element={token ? <Feed feed={allPosts} /> : <Login />} />
        <Route path="/myfeed" element={token ? <Feed feed={currentUserPosts} /> : <Login />} />
        <Route path="/friendfeed" element={token ? <Feed feed={friendsPosts} /> : <Login />} />
        <Route path="/login" element={!token ? <Login /> : <Home />} />
      </Routes>
    </div>
  );
}

export default App;
