import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import { FriendContext } from "../../context/friendProvider";
export default function SelectedUser(props) {
  const navigate = useNavigate()
  const { user, toggleSearch } = props; 
  const {friends, friendRequest}= useContext(FriendContext)

  
  function addNewFriend() {   
    friendRequest(user);
  }

  function navToFriendsPage (){
    toggleSearch()
    navigate(`profile/${user}`)
  }

//shows  add, pending, or friend in searchbox
function addFriend () {
if(friends?.friends.find((item) => item.user === user )) {
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
      </p>{" "}
     {addFriend ()}
      
    </div>
  );
}
