import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RepliesState {
    replies: any[];
  }
  
  const initialRepliesState: RepliesState = {
    replies: [],
  };
  
  export const repliesSlice = createSlice({
    name: 'replies',
    initialState: initialRepliesState,
    reducers: {
      setReplies: (state, action: PayloadAction<RepliesState['replies']>) => {
        state.replies = action.payload;
      },
      addReply:(state,action)=>{
        state.replies.push(action.payload)
      }
    },
  });