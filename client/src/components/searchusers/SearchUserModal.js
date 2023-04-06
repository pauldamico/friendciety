import React, {useEffect,useState, useContext} from "react"
import axios from "axios"
import { friendsSlice } from "../../redux"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import SelectedUser from "./SelectedUser"


const{setFriends} = friendsSlice.actions

export default function SearchUserModal (props){
  const navigate = useNavigate()
    const dispatch = useDispatch()
   const {currentUser} = useSelector(state=>state.currentUser)
   const {friends} = useSelector(state=>state.friends)
   const {token} = currentUser || null
   const config = {headers:{Authorization: `Bearer ${token}`}}
const [searchToggle, setSearchToggle] = useState(false)

const [allUsers, setAllUsers] = useState([])
   const [search, setSearch] = useState("")  
const inputStyle = { borderRadius:"10px", gridColumn:"1/2"}

//this allows the search function to work correctly
const filterBySearch = allUsers.length > 0 ? allUsers.filter(user=>user.includes(search)) : []

  //resets the text in search users
  function resetSearch (){
    setSearch("") 
  }

  function toggleSearch (){
    setSearchToggle(!searchToggle) 
   
}

// on change of the search input and also sets the searchToggle to true
function searchUsersHandler (event){   
  setSearch(event.target.value)
  setSearchToggle(true)
}


  //gets list of searchable users
  function getListOfAllUsers (filter){
   
    }

    function navToFriendsPage (user){
      console.log(user)
           navigate(`profile/${user}`)
    }

function refreshFriendData (){   
    axios.get('/auth/friends/friends', config)    
    .then(res=>{
       console.log(res.data)
      dispatch(setFriends(res.data))
    })}

    function getAllUsers (){
        axios.get('/auth/allusers', config)
        .then(res=>{      
            // console.log(res.data)
          setAllUsers(res.data)
        })     
      } 
      const listFriendsElement =filterBySearch.filter(user=>user !== currentUser.user.username && user )

useEffect(()=>{
getAllUsers()  

}, [])

    return(
    <div onClick={toggleSearch} className="search-user-main-div"> 
           <input style={inputStyle} onChange ={searchUsersHandler} onClick={toggleSearch}  placeholder='Search Users...'/>
          {searchToggle && <div className="search-user-div" >
        {filterBySearch.map(user=>user!== currentUser.user.username && <SelectedUser resetSearch={resetSearch} key={user} user={user} toggleSearch={toggleSearch}/>)}
 
        </div>}       
    </div>
    )
}