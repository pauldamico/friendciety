import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
  posts: any[];
}

const initialMyFeedState: PostsState = {
  posts: [],
};



/// posts
export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialMyFeedState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostsState['posts']>) => {
      state.posts = action.payload;
    },
  },
});