import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/authProvider'

export default function SideBar () {

    const {token} = useContext(AuthContext)
    return (
        <div className="sidebar-div">
            {token ?
            <div className='sidebar-div2'>
           <Link to="/myfeed">MyFeed</Link>
           <Link to="/friendfeed">Friend Feed</Link>
           </div> : null}
        </div>
    )
}