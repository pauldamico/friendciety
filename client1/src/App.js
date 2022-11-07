
import React, {useState} from 'react';
import Nav from './components/Nav';
import Login from './components/Login';
import Home from './components/Home';
import MyFeed from './components/MyFeed';
import {Routes, Route} from 'react-router-dom'
import './App.css';

function App() {



  return (
    <div className="app">
      <Nav/>

      <Routes>
      <Route path ='/' element={<Home/>} />
      <Route path ='/login' element={<Login/>} />
      <Route path ='/myfeed' element={<MyFeed/>} />
      </Routes>
    </div>
  );
}

export default App;
