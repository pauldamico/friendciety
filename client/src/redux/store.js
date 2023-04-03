import { configureStore } from "@reduxjs/toolkit";
import {authSlice, commentsSlice,friendsSlice, postsSlice, repliesSlice} from "./index.js"
 
export const store = configureStore({
  reducer: {
    currentUser:authSlice.reducer, 
    friends:friendsSlice.reducer,
    posts:postsSlice.reducer,
    comments:commentsSlice.reducer,
    replies:repliesSlice.reducer

  },
});