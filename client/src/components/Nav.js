import {Link} from 'react-router-dom'
import React, {useState, useContext} from 'react'
import { AuthContext } from '../authProvider'
import SearchUserModal from './SearchUserModal'

export default function Nav (){

    const {getListOfAllUsers, token, logout, allUsers} = useContext(AuthContext)
    const [searchToggle, setSearchToggle] = useState(false)

    function toggleSearch (){
        setSearchToggle(!searchToggle)
    }
  


function searchUsersHandler (event){   
    getListOfAllUsers(event.target.value)
}
    return (
        <div className='nav-div'>    
          <SearchUserModal toggleSearch={toggleSearch} searchToggle={searchToggle} searchUsersHandler={searchUsersHandler} allUsers={allUsers}/>    
            {/* {!searchToggle &&<input onClick={toggleSearch} placeholder='Search Users...'/>} */}
            <div className='nav-div-div'>
            <Link to={token ? '/' : '/login'}> Home</Link>
            {!token ? <Link to='/login'> Login</Link> : <button onClick = {logout}> Logout</button>}
            </div>
            
        </div>
    )
}