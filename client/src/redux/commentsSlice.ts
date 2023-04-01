import {createSlice, PayloadAction} from '@reduxjs/toolkit'


interface CommentsState {
    comments: any[];
  }
  
  const initialCommentsState: CommentsState = {
    comments: [],
  };
  
  /// comments
  export const commentsSlice = createSlice({
    name: 'comments',
    initialState: initialCommentsState,
    reducers: {
      setComments: (state, action: PayloadAction<CommentsState['comments']>) => {
        state.comments = action.payload;
      },
      addComment:(state, action)=>{
        state.comments.push(action.payload)
      }
    },
  });