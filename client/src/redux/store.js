import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from "./index.js"
import {friendsSlice} from "./index.js"
import { postsSlice } from "./index.js";
 
export const store = configureStore({
  reducer: {
    currentUser: authSlice.reducer, 
    friends:friendsSlice.reducer,
    posts: postsSlice.reducer
  },
});