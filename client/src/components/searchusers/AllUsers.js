import React, {useEffect,useState} from "react"
import axios from "axios"
import {useSelector} from "react-redux"
import AllUsersModal from "./AllUsersModal"

export default function AllUsers (props){

   const {currentUser} = useSelector(state=>state.currentUser)
   const {token} = currentUser || null
   const config = {headers:{Authorization: `Bearer ${token}`}}
   const [searchToggle, setSearchToggle] = useState(false)
   const [allUsers, setAllUsers] = useState([])
   const [search, setSearch] = useState("")  


//this allows the search function to work correctly
const filterBySearch = allUsers.length > 0 ? allUsers.filter(user=>user.includes(search)) : []

  //resets the text in search users
  function resetSearch (){
    setSearch("") 
  }

  function toggleSearch (){
    resetSearch()
    setSearchToggle(!searchToggle) 
   
}

// on change of the search input and also sets the searchToggle to true
function searchUsersHandler (event){   
  setSearch(event.target.value)
  setSearchToggle(true)
}


    function getAllUsers (){
        axios.get('/auth/allusers', config)
        .then(res=>{      
            // console.log(res.data)
          setAllUsers(res.data)
        })     
      } 


useEffect(()=>{
getAllUsers()  

}, [])

    return(
    <div onClick={toggleSearch} className="search-user-main-div"> 
 
   <AllUsersModal resetSearch={resetSearch} searchUsersHandler={searchUsersHandler} filterBySearch={filterBySearch} />
    </div>
    )
}