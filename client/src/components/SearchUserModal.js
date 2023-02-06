export default function SearchUserModal (props){
const {searchToggle, toggleSearch, allUsers, searchUsersHandler} = props

const divStyle = {  height:"100px",  backgroundColor:"white", display:"flex", flexDirection:"column", zIndex:"100", overflow:"auto"}
const inputStyle = { width:"100%", gridColumn:"1/3", gridRow:"4/7",  borderRadius:"10px"}
    return(<div className="search-user-div">
           <input style={inputStyle} onChange ={searchUsersHandler} onClick={toggleSearch}  placeholder='Search Users...'/>
           {searchToggle && <div style={divStyle}>
           
        {allUsers.map(user=><p style={{textAlign:"center"}} key={user} onClick={toggleSearch}>{user}</p>)}
        </div>}
    </div>)
}