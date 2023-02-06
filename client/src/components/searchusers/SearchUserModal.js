import SelectedUser from "./SelectedUser"
export default function SearchUserModal (props){
const {searchToggle, toggleSearch, allUsers, searchUsersHandler} = props

const divStyle = {  height:"60px",  backgroundColor:"white", display:"flex", flexDirection:"column", zIndex:"100", overflow:"auto"}
const inputStyle = { borderRadius:"10px", gridColumn:"1/2"}



    return(<div className="search-user-div">
        
         
           <input style={inputStyle} onChange ={searchUsersHandler} onClick={toggleSearch}  placeholder='Search Users...'/>
          { searchToggle && <div style={divStyle}>
        {allUsers.map(user=><SelectedUser style={{textAlign:"center"}} key={user} user={user} toggleSearch={toggleSearch}/>)}
        </div>}
        
      
    </div>)
}