import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyFeedState {
  posts: any[];
}

const initialMyFeedState: MyFeedState = {
  posts: [],
};



/// posts
export const posts = createSlice({
  name: 'posts',
  initialState: initialMyFeedState,
  reducers: {
    setMyFeed: (state, action: PayloadAction<MyFeedState['posts']>) => {
      state.posts = action.payload;
    },
  },
});

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
  },
});

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
  },
});