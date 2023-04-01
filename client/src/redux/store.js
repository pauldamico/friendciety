import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from "./authSlice.ts"
import {friendsSlice} from "./friendsSlice.ts"
 
export const store = configureStore({
  reducer: {
    currentUser: authSlice.reducer, 
    friends:friendsSlice.reducer
  },
});