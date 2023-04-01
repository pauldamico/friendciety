import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface Post {
  _id:string,
  post:string,
  image:string,
  postOrder:string,
  username:string,
  userId:string,
  likes:[],
  dislikes:[],
  __v:number
}

interface PostsState {
  posts: Post[];
}

const initialMyFeedState:PostsState = {
  posts: [
  ],
};

/// posts
export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialMyFeedState,
  reducers: {
    setPosts: (state, action:PayloadAction<Post[]>) => {
      state.posts = action.payload     
    }, 
    addPost:(state,action:PayloadAction<Post>)=>{
      state.posts.push(action.payload)
    }
  },
});