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
export const authSlice = createSlice({    
name:"currentUser",
initialState,
reducers:{
    setCurrentUser:(state, action:PayloadAction<AuthState["currentUser"]>)=>{
        state.currentUser = action.payload 
    }
}
})



