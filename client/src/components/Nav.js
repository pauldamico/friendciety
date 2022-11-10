import {Link} from 'react-router-dom'
import React, {useContext} from 'react'
import { UserContext } from '../userContext'

export default function Nav (){

    // const {useContext} = useContext(UserContext)
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