import React, {useState, createContext, useEffect} from "react";
import axios from "axios";

const UserContext = createContext()

function UserContextProvider (props){
const [users, setUsers] = useState([])

useEffect(()=>{
axios.get('/users')
.then(res=>setUsers(prev=>[...res.data]))
}, [])

console.log(users)

return(
    <UserContext.Provider value={{test:"test"}}>

{props.children}
    </UserContext.Provider>
)
}


export {UserContext, UserContextProvider}