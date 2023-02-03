import {Link} from 'react-router-dom'
import React, {useContext} from 'react'
import { AuthContext } from '../authProvider'

export default function Nav (){

    const {token, logout} = useContext(AuthContext)

    return (
        <div className='nav-div'>
           
            <input placeholder='Search Users...'/>
            <div>
            <Link to={token ? '/' : '/login'}> Home</Link>
            {!token ? <Link to='/login'> Login</Link> : <button onClick = {logout}> Logout</button>}
            </div>
            
        </div>
    )
}