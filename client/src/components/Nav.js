import {Link} from 'react-router-dom'
import React, {useState, useContext, useEffect} from 'react'
import { AuthContext } from '../context/authProvider'
import {useSelector, useDispatch} from 'react-redux'
import { authSlice, postsSlice, repliesSlice, friendsSlice, commentsSlice } from '../redux'
import { useNavigate } from 'react-router-dom'
import WindowSize from './WindowSize'
import FriendRequests from './acceptfriend/FriendRequests'
import SearchUserModal from './searchusers/SearchUserModal'
import BasicMenu from './MUI/BasicMenu'
import {ApiCalls} from "./ApiCalls"


const {resetCurrentUser} = authSlice.actions
const {resetPosts} = postsSlice.actions
const {resetComments} = commentsSlice.actions
const {resetReplies} = repliesSlice.actions
const {resetFriends} = friendsSlice.actions

export default function Nav (){
    const {getPosts, getComments, getReplies, getFriends} = ApiCalls()
    const navigate = useNavigate()
   const dispatch = useDispatch()
    const {currentUser} = useSelector(state=>state.currentUser)
    const {friends} = useSelector(state=>state.friends)
    const {token} = currentUser || null
 
  
    function logoff (){
        localStorage.clear()
        dispatch(resetCurrentUser()  )
        dispatch(resetComments())
        dispatch(resetPosts())
        dispatch(resetReplies())
        dispatch(resetFriends())   
        return(navigate('/Login'))
        // resetSearch()
        }
      

    return (
        <div>

        {token ? <div className='nav-div' >
        { token ? <FriendRequests/> : null}
       <WindowSize arrow="<"> <BasicMenu/></WindowSize>
         
            {token ?<div  className='nav-div-div'>
            { token ? <SearchUserModal  />: null    }
            {!token ? <Link to='/login'> Login</Link> : <div className='logout-div'><h3 onClick = {logoff}> <img alt="" height='15px' width='15px' src={require('../images/logout.png')}/>Logout</h3></div>}
            </div> : null}
            </div> : null}
        </div> 
    )
}