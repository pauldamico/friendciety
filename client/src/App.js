import React, { useState, useContext } from "react";
import FriendFeed from "./components/FriendFeed";
import Nav from "./components/Nav";
import Login from "./components/login/Login";
import Home from "./components/Home";
import MyFeed from "./components/myfeed/MyFeed";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";
import { AuthContext } from "./authProvider";

function App() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="app">
      <Nav />
      <SideBar />
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />} />
        <Route path="/myfeed" element={token ? <MyFeed /> : <Login />} />
        <Route path="/friendfeed" element={token ? <FriendFeed /> : <Login />} />
        <Route path="/login" element={!token ? <Login /> : <Home />} />
      </Routes>
    </div>
  );
}

export default App;
