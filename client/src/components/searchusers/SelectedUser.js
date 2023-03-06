import React,{useContext} from "react";
import { AuthContext } from "../../authProvider";
export default function SelectedUser(props) {
  const { user, toggleSearch } = props;
  const { getAllUsers, currentUser, friendRequest } = useContext(AuthContext);


  
  function addNewFriend() {
    getAllUsers()
    friendRequest(user);
    toggleSearch();
  }

function addFriend () {
if(currentUser?.user.friends.find((item) => item.user === user )) {
return <section>Friend</section>
}
if(currentUser?.user.friends.find((item) => item.user !== user ) && currentUser?.user.pendingRequest.find((item) => item !== user )) {
return <section style={{ cursor: "pointer" }} onClick={addNewFriend}>Add</section>
  }
if(currentUser?.user.pendingRequest.find((item) => item === user )) {
  return <section>Pending</section>}
}


  return (
    <div className="selected-user-list-div">
      <p
        onClick={() => {
          toggleSearch();
        }}
      >
        {user}
      </p>{" "}
     {addFriend()}
      
    </div>
  );
}
