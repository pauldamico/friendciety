import React,{useContext} from "react";
import { AuthContext } from "../../authProvider";
export default function SelectedUser(props) {
  const { user, toggleSearch } = props;
  const { currentUser, friendRequest } = useContext(AuthContext);


  
  function addNewFriend() {
    console.log(user);
    friendRequest(user);
    toggleSearch();
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
      {currentUser?.user.friends.find((item) => item.user == user ) 
      ? 
      <section style={{ cursor: "pointer" }} >Remove</section> 
      : 
      <section style={{ cursor: "pointer" }} onClick={addNewFriend}>Add</section>}
    </div>
  );
}
