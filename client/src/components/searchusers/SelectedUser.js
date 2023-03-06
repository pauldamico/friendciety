import React,{useState, useContext} from "react";
import { AuthContext } from "../../authProvider";
export default function SelectedUser(props) {
  const { user, toggleSearch } = props;
  const { getAllUsers, currentUser, friendRequest } = useContext(AuthContext);
const [friendsListConditions, setFriendsListConditions] = useState(addFriend ())


  
  function addNewFriend() {   
    friendRequest(user);
    toggleSearch();
   setFriendsListConditions(addFriend())
  }

console.log(currentUser)

function addFriend () {
if(currentUser?.user.friends.find((item) => item.user === user )) {
return <section>Friend</section>
}

if(currentUser?.user.pendingRequest.find((item) => item === user )|| currentUser?.user.friendRequest.find((item) => item === user )) {
  return <section>Pending</section>}
else{return <section style={{ cursor: "pointer" }} onClick={addNewFriend}>Add</section> }
  
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
     {friendsListConditions}
      
    </div>
  );
}
