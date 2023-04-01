import {Link} from 'react-router-dom'
import React, {useState, useContext} from 'react'
import { AuthContext } from '../context/authProvider'
import {useSelector} from 'react-redux'
import { PostContext } from '../context/postProvider'
import WindowSize from './WindowSize'
import FriendRequests from './acceptfriend/FriendRequests'
import SearchUserModal from './searchusers/SearchUserModal'
import BasicMenu from './MUI/BasicMenu'




export default function Nav (){
   
    const {currentUser} = useSelector(state=>state.currentUser)
    const {token} = currentUser || null
    const {getAllUsers, search, getListOfAllUsers, logout, allUsers} = useContext(AuthContext)
    const {clearMyFeed} = useContext(PostContext)
    const [searchToggle, setSearchToggle] = useState(false)
   

    function toggleSearch (){
        setSearchToggle(!searchToggle) 
       
    }

    function logoff(){
        logout()
        clearMyFeed()
        setSearchToggle(false)
        // clearFriendsFeed()
    }

// on change of the search input and also sets the searchToggle to true
function searchUsersHandler (event){   
    getListOfAllUsers(event.target.value)
    setSearchToggle(true)
}


    return (
        <div>

        {token ? <div className='nav-div' >
        { token ? <FriendRequests/> : null}
       <WindowSize arrow="<"> <BasicMenu/></WindowSize>
         
            {token ?<div  className='nav-div-div'>
            { token ? <SearchUserModal getAllUsers={getAllUsers} search ={search} currentUser={currentUser} toggleSearch={toggleSearch} searchToggle={searchToggle} searchUsersHandler={searchUsersHandler} allUsers={allUsers}/>: null    }
            {!token ? <Link to='/login'> Login</Link> : <div className='logout-div'><h3 onClick = {logoff}> <img alt="" height='15px' width='15px' src={require('../images/logout.png')}/>Logout</h3></div>}
            </div> : null}
            </div> : null}
        </div> 
    )
}