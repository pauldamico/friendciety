import {Link} from 'react-router-dom'
import React, {useContext} from 'react'
import { AuthContext } from '../authProvider'

export default function Nav (){

    const {} = useContext(AuthContext)
    return (
        <div className='nav-div'>
           
            <input placeholder='Search Users...'/>
            <div>
            <Link to='/'> Home</Link>
            <Link to='/login'> Login</Link>
            </div>
        </div>
    )
}