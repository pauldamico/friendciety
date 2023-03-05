import SelectedUser from "./SelectedUser"
export default function SearchUserModal (props){
const {searchToggle, toggleSearch, allUsers, searchUsersHandler,currentUser } = props

const inputStyle = { borderRadius:"10px", gridColumn:"1/2"}

    return(<div className="search-user-main-div">
        
         
           <input style={inputStyle} onChange ={searchUsersHandler} onClick={toggleSearch}  placeholder='Search Users...'/>
          { searchToggle && <div className="search-user-div" >
        {allUsers.map(user=>user!== currentUser?.user.username && <SelectedUser  key={user} user={user} toggleSearch={toggleSearch}/>)}
        </div>}
        
      
    </div>)
}