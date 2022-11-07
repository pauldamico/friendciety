import React, {useState} from 'react';
import MyFamily from './components/MyFamily';
import Nav from './components/Nav';
import Login from './components/Login';
import Home from './components/Home';
import MyFeed from './components/MyFeed';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import SideBar from './components/SideBar';
import {MyFeedContextProvider} from './myFeedContext.js';

function App() {



  return (
    <div className="app">
      <Nav/>
      <SideBar/>
      <Routes>
      <Route path ='/' element={<Home/>} />
      <Route path ='/login' element={<Login/>} /> 
      <Route path ='/myfeed' element={  <MyFeedContextProvider><MyFeed/></MyFeedContextProvider>} />   
      <Route path ='/myfamily' element={<MyFamily/>} />
      </Routes>
    </div>
  );
}

export default App;
