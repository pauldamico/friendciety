import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {friendsSlice} from "../../redux/index"

const { setFriends} = friendsSlice.actions;

export default function FriendRequest(props) {
  const { currentUser } = useSelector((state) => state.currentUser);  
  const dispatch = useDispatch()
  const { token } = currentUser || null;
  const config = {headers:{Authorization: `Bearer ${token}`}}

  //Accept friend request or add friend   this prob needs to be fixed
  function acceptFriendRequest() {
    console.log(props.user);
    axios
      .put("/auth/friends/acceptfriend", { user: props.user }, config)
      .then((res) => {
        console.log(res.data);
        dispatch(setFriends(res.data))
        // refreshFriendData();
      });
  }

  //Decline friend request or add friend   this prob needs to be fixed
  function declineFriendRequest() {
    axios
      .delete("/auth/friends/declinefriend", {
        data: { user: props.user },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(setFriends(res.data))
        console.log(res.data);
        // refreshFriendData();
      });
   
  }

  // //may not need this
  // function refreshFriendData (){   
  //   axios.get('/auth/friends/friends', config)    
  //   .then(res=>{
  //     dispatch(setFriends)(prev=>({...prev, ...res.data}))    
  //   })}



  return (
    <div className="friend-request">
      {props.user}
      <span style={{ cursor: "pointer" }} onClick={acceptFriendRequest}>
        
        Add
      </span>
      <span
        style={{ color: "red", cursor: "pointer" }}
        onClick={declineFriendRequest}
      >
        X
      </span>
    </div>
  );
}
