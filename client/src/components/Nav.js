import {Link} from 'react-router-dom'
import React, {useState, useContext} from 'react'
import { AuthContext } from '../context/authProvider'
import { MyFeedContext } from '../context/myFeedProvider'
import { FriendsFeedContext } from '../context/friendsFeedProvider'
import FriendRequests from './acceptfriend/FriendRequests'
import SearchUserModal from './searchusers/SearchUserModal'

export default function Nav (){

    const {search, currentUser, getListOfAllUsers, token, logout, allUsers} = useContext(AuthContext)
    const {clearMyFeed} = useContext(MyFeedContext)
    const{clearFriendsFeed} = useContext(FriendsFeedContext)
    const [searchToggle, setSearchToggle] = useState(false)
   

    function toggleSearch (){
        setSearchToggle(!searchToggle)        
    }

    function logoff(){
        logout()
        clearMyFeed()
        clearFriendsFeed()
    }

// on change of the search input and also sets the searchToggle to true
function searchUsersHandler (event){   
    getListOfAllUsers(event.target.value)
    setSearchToggle(true)
}
    return (
        <div>
        {token ? <div className='nav-div' >
                  
        { token ? <SearchUserModal search ={search} currentUser={currentUser} toggleSearch={toggleSearch} searchToggle={searchToggle} searchUsersHandler={searchUsersHandler} allUsers={allUsers}/>: null    }
   
            {/* {!searchToggle &&<input onClick={toggleSearch} placeholder='Search Users...'/>} */}
            {token ?<div onClick={()=>{setSearchToggle(false)}} className='nav-div-div'>
            <Link to={token ? '/' : '/login'}> Home</Link>   
           { token ? <FriendRequests/> : null}
            {!token ? <Link to='/login'> Login</Link> : <div className='logout-div'><h3 onClick = {logoff}> <img height='15px' width='15px' src={require('../images/logout.png')}/>Logout</h3></div>}
            </div> : null}
            </div> : null}
        </div> 
    )
}