import {Link} from 'react-router-dom'
import React, {useState, useContext} from 'react'
import { AuthContext } from '../context/authProvider'
import {useSelector, useDispatch} from 'react-redux'
import { authSlice } from '../redux'
import { PostContext } from '../context/postProvider'
import WindowSize from './WindowSize'
import FriendRequests from './acceptfriend/FriendRequests'
import SearchUserModal from './searchusers/SearchUserModal'
import BasicMenu from './MUI/BasicMenu'


const {setCurrentUser} = authSlice.actions

export default function Nav (){
   const dispatch = useDispatch()
    const {currentUser} = useSelector(state=>state.currentUser)
    const {token} = currentUser || null
    const { logout} = useContext(AuthContext)
    const {clearMyFeed} = useContext(PostContext)
  
    function logoff (){
        localStorage.clear()
        dispatch(setCurrentUser({token:null, user:{}})  )
        // clearMyFeed()
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