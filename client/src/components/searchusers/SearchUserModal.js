import SelectedUser from "./SelectedUser"
export default function SearchUserModal (props){
const {searchToggle, toggleSearch, allUsers, searchUsersHandler} = props

const inputStyle = { borderRadius:"10px", gridColumn:"1/2"}



    return(<div className="search-user-main-div">
        
         
           <input style={inputStyle} onChange ={searchUsersHandler} onClick={toggleSearch}  placeholder='Search Users...'/>
          { searchToggle && <div className="search-user-div" >
        {allUsers.map(user=><SelectedUser  key={user} user={user} toggleSearch={toggleSearch}/>)}
        </div>}
        
      
    </div>)
}