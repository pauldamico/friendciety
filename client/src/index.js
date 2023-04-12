import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router,} from 'react-router-dom'
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthContextProvider } from './context/authProvider';
import { FriendContextProvider } from './context/friendProvider';
import { PostContextProvider } from './context/postProvider';
import { Provider } from 'react-redux';
import {store} from "./redux/store.js"
// import { FriendsFeedContextProvider } from './context/friendsFeedProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Auth0Provider 
domain={process.env.REACT_APP_AUTH0_DOMAIN}
clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
 authorizationParams={{
  redirect_uri:process.env.REACT_APP_AUTH0_REDIRECT_URI ,
  audience:process.env.REACT_APP_AUTH0_AUDIENCE,
  scope: process.env.REACT_APP_AUTH0_SCOPE
 }}
>
  <Router>
  <React.StrictMode>
     <Provider store = {store}>
    <App />
    </Provider>

  </React.StrictMode>
  </Router>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

