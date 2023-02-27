import {Link} from 'react-router-dom'
import React, {useState, useContext} from 'react'
import { AuthContext } from '../authProvider'
import SearchUserModal from './searchusers/SearchUserModal'

export default function Nav (){

    const {currentUser, getListOfAllUsers, token, logout, allUsers} = useContext(AuthContext)
    const [searchToggle, setSearchToggle] = useState(false)

    function toggleSearch (){
        setSearchToggle(!searchToggle)
    }
  console.log(currentUser?.user?.username)


function searchUsersHandler (event){   
    getListOfAllUsers(event.target.value)
}
    return (
        <div className='nav-div' >    
        { token ? <SearchUserModal  toggleSearch={toggleSearch} searchToggle={searchToggle} searchUsersHandler={searchUsersHandler} allUsers={allUsers}/>: null    }
        {token ?<section>    Welcome {currentUser?.user?.username}</section> : null}
            {/* {!searchToggle &&<input onClick={toggleSearch} placeholder='Search Users...'/>} */}
            <div onClick={()=>{setSearchToggle(false)}} className='nav-div-div'>
            <Link to={token ? '/' : '/login'}> Home</Link>
            
            {!token ? <Link to='/login'> Login</Link> : <button onClick = {logout}> Logout</button>}
            </div>
            
        </div>
    )
}