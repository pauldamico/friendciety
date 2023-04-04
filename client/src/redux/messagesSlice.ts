import { createSlice, PayloadAction } from "@reduxjs/toolkit";




const initialState = {messages:{
    receivedMessages: [],
      sentMessages: [],
      userId: "",
      username: "",
      _id:""
    }}


export const messagesSlice = createSlice({
    name:"messages",
    initialState,
    reducers:{
        setMessages:(state, action:PayloadAction<typeof initialState['messages']>)=>{
            state.messages = action.payload
        }
    }

})




