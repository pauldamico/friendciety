import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { friendsSlice } from "../../redux";

const {setFriends} = friendsSlice.actions

export default function SelectedUser(props) {
  const dispatch = useDispatch()
  const {friends} = useSelector(state=>state.friends)
  const {currentUser} = useSelector(state=>state.currentUser)
  const navigate = useNavigate()
  const { token } = currentUser || null;
  const config = {headers:{Authorization: `Bearer ${token}`}}

  
  const { user,  handleClose } = props; 


///this is broken
function addNewFriend (){   
    
  axios.put(`/auth/friends/addfriend`, {user:user}, config)
  .then(res=>{console.log(res.data)
    dispatch(setFriends(res.data) )
    // resetSearch()
  })
  .catch(err=>console.log(err))
}

  function navToFriendsPage (){ 
    handleClose()
    navigate(`profile/${user}`)
  
  }

//shows  add, pending, or friend in searchbox
function addFriend () {
if(friends?.friends?.find((item) => item.user === user )) {
return <section>Friend</section>
}
if(friends?.pendingRequest.find((item) => item === user )|| friends?.friendRequest.find((item) => item === user )) {
  return <section>Pending</section>}
else{return <section style={{ cursor: "pointer" }} onClick={addNewFriend}>Add</section> }  
}


  return (
    <div className="selected-user-list-div">
      <p style={{cursor:"pointer"}}
        onClick={() => {
          navToFriendsPage()
        }}
      >
        {user}
      </p>
     {addFriend ()}
      
    </div>
  );
}
