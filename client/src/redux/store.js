import { configureStore } from "@reduxjs/toolkit";
import {authSlice, allUsersSlice, commentsSlice,friendsSlice, postsSlice, repliesSlice, loadingSlice, messagesSlice} from "./index.js"
 
export const store = configureStore({
  reducer: {
    currentUser:authSlice.reducer, 
    friends:friendsSlice.reducer,
    posts:postsSlice.reducer,
    comments:commentsSlice.reducer,
    replies:repliesSlice.reducer,
    messages:messagesSlice.reducer,
    loading:loadingSlice.reducer,   
    allUsers:allUsersSlice.reducer

  },
});