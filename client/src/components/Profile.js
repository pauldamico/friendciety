import React, {useEffect} from "react"
import axios from "axios"
import Feed from "./Feed"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { postsSlice, commentsSlice, repliesSlice, friendsSlice } from "../redux"


const {setPosts, addPost} = postsSlice.actions
const {setComments} = commentsSlice.actions
const {setReplies} = repliesSlice.actions
const {setFriends} = friendsSlice.actions

export default function Profile (){    
  const dispatch = useDispatch()
 
    const{currentUser} = useSelector(state=>state.currentUser)
    const {token} = currentUser || null
    const config = {headers:{Authorization: `Bearer ${token}`}}
    const {friends} = useSelector(state=>state.friends)   
    const {posts} = useSelector(state=>state.posts)  
    const navigatedUser = useParams().userprofile

    const getPosts = () =>{
        token && axios.get(`/auth/post/currentUserPosts`, config)    
        .then((res) => dispatch(setPosts(res.data)))
        .catch(err=>console.log(err));   
      }
  
      const getComments = ()=>{
        axios.get('/auth/comment', config)
        .then(res=>{dispatch(setComments(res.data))})
        .catch(err=>console.log(err))
      }
      // get all replies 
      const getReplies = ()=>{
        axios.get('/auth/reply', config)
        .then(res=>{dispatch(setReplies(res.data))})
        .catch(err=>console.log(err))
      }
  
      //get all friends
      function getFriendData (){   
        axios.get('/auth/friends/friends', config)    
        .then(res=>{
          dispatch(setFriends(res.data))   
        })}
  
        useEffect(()=>{
            getPosts()
            getComments()
            getReplies()
            getFriendData()
          }, [])


//maps combines all friends and username into one array
const profile = friends?.friends?.map(friend=>friend.user).concat(currentUser?.user?.username)
//shows posts according to the endpoint
const userPosts = posts?.filter(post=>post.username === navigatedUser) || ""
//shows the username according to the endpoint
const selectedUser = profile?.find(user=>user === navigatedUser) || null




    return (<div className="flexbox" >
       
        {selectedUser ?<div className="profile-div flexbox center">
         <h1>Username: {selectedUser}</h1>
            <img alt="" width="100px" height="100px" />
           {currentUser.user.username !== navigatedUser ? <h3>Remove Friend</h3> : null}
            </div> :<div className="profile-div flexbox center">User must be a friend to view this page</div>}
            <div>
        <Feed user={selectedUser} feed={userPosts}/>
        </div>
    </div>)
}