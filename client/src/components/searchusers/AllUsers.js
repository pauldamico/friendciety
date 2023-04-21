import React, {useEffect,useState} from "react"
import {useSelector} from "react-redux"
import AllUsersModal from "./AllUsersModal"
import { ApiCalls } from "../ApiCalls"

export default function AllUsers (){
const {allUsers} = useSelector(state=>state.allUsers)
  const {getAllUsers} = ApiCalls()
   const [searchToggle, setSearchToggle] = useState(false)
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

useEffect(()=>{
getAllUsers()  

}, [])

    return(
    <div onClick={toggleSearch} className="search-user-main-div"> 
 
   <AllUsersModal resetSearch={resetSearch} searchUsersHandler={searchUsersHandler} filterBySearch={filterBySearch} />
    </div>
    )
}