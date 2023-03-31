import React, {useEffect, useContext} from "react"
import { FriendContext } from "../../context/friendProvider"
import SelectedUser from "./SelectedUser"


export default function SearchUserModal (props){
    const {refreshFriendData} = useContext(FriendContext)
const {search, searchToggle, toggleSearch, allUsers, searchUsersHandler,currentUser } = props
const inputStyle = { borderRadius:"10px", gridColumn:"1/2"}

//this allows the search function to work correctly
const filterBySearch = allUsers.length > 0 ? allUsers.filter(user=>user.includes(search)) : []


useEffect(()=>{
props.getAllUsers()  
refreshFriendData ()
}, [])
    return(<div  onClick={toggleSearch} className="search-user-main-div"> 
           <input style={inputStyle} onChange ={searchUsersHandler} onClick={toggleSearch}  placeholder='Search Users...'/>
          {searchToggle && <div className="search-user-div" >
        {filterBySearch.map(user=>user!== currentUser?.user.username && <SelectedUser  key={user} user={user} toggleSearch={toggleSearch}/>)}
        </div>}       
    </div>)
}