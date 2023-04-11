import { useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import { postsSlice, commentsSlice, repliesSlice, friendsSlice, authSlice, messagesSlice } from "../redux"

const {setPosts} = postsSlice.actions
const {setComments} = commentsSlice.actions
const {setReplies} = repliesSlice.actions
const {setFriends} = friendsSlice.actions
const {setMessages} = messagesSlice.actions
const {setCurrentUserLocalStorage} = authSlice.actions

//this is a location where you can store reusable api calls that update redux state

export const ApiCalls = () => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.currentUser)
  const {token} = currentUser || null
  const config = {headers:{Authorization: `Bearer ${token}`}}

  const getPosts = () => {
    token && axios.get(`/auth/post/currentUserPosts`, config)
      .then((res) => dispatch(setPosts(res.data)))
      .catch(err => console.log(err));
  };

  const getComments = () => {
     token && axios.get('/auth/comment', config)
      .then(res => dispatch(setComments(res.data)))
      .catch(err => console.log(err));
  };

  const getReplies = () => {
    token &&  axios.get('/auth/reply', config)
      .then(res => dispatch(setReplies(res.data)))
      .catch(err => console.log(err));
  };

  const getFriends = () => {
    token &&  axios.get('/auth/friends/friends', config)
      .then(res => dispatch(setFriends(res.data)))
      .catch(err => console.log(err));
  }

  const getMessages= () => {
    token &&  axios.get('/auth/messages/', config)
      .then(res => {       
        dispatch(setMessages(res.data))})
      .catch(err => console.log(err));
  }

  const updateUserInfo = () =>{
    dispatch(setCurrentUserLocalStorage())
  }

  return { getPosts, getComments, getReplies, getFriends, updateUserInfo, getMessages};
}