import {createSlice, PayloadAction} from '@reduxjs/toolkit'


interface FriendsState {friends:{
    friends:[]
    friendRequest:[], pendingRequest:[], username:string, _id:string, userId:string}
  }


  const initialState: FriendsState = {friends:{
    friends:[], friendRequest:[], pendingRequest:[], username:"", _id:"", userId:""}};
    
export const friendsSlice = createSlice({    
name:"friends",
initialState:initialState,
reducers:{
    setFriends:(state, action:PayloadAction<FriendsState["friends"]>)=>{
        state.friends = action.payload 
    },
    resetFriends:(state)=>{
        state.friends = initialState.friends
      }
}
})



