import {createSlice, PayloadAction} from '@reduxjs/toolkit'
interface User {
    _id:string,
    username:string,
}

interface AuthState {
    currentUser: {
      token: string | null;
      user: User | {};
      otpauthUrl: string | null
    };
  }

  const initialState: AuthState = {
    currentUser: JSON.parse(localStorage.getItem("userInfo") || "null") || {
      token: null,
      user: {},
      otpauthUrl: "",
    },
  };

  const resetState: AuthState = {
    currentUser: {
      token: null,
      user: {},
      otpauthUrl: null,
    },
  };
export const authSlice = createSlice({    
name:"currentUser",
initialState,
reducers:{
    setCurrentUser:(state, action:PayloadAction<AuthState["currentUser"]>)=>{
        state.currentUser = action.payload 
    },
    resetCurrentUser:(state)=>{
      state.currentUser = resetState.currentUser
    }
}
})



