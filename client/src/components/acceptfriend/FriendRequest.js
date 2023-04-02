import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {friendsSlice} from "../../redux/index"

const { setFriends } = friendsSlice.actions;

export default function FriendRequest(props) {
  const { currentUser } = useSelector((state) => state.currentUser);
  const { friends } = useSelector((state) => state.friends);
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
        dispatch(setFriends(friends.map(friend=> ({
            ...friend,
            friends: [...friend.friends, res.data],
            friendRequest: friend.friendRequest.filter(
              (item) => item !== props.user
            )})) ))
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
        dispatch(setFriends(friends.map(friend => ({
            ...friend,
            user: {
              ...friend.user,
              friendRequest: friend.user.friendRequest.filter(
                (item) => item !== props.user
              ),
            },
          })) ))
        console.log(res.data);
        // refreshFriendData();
      });
    console.log(config);
  }

  // //may not need this
  // function refreshFriendData (){   
  //   axios.get('/auth/friends/friends', config)    
  //   .then(res=>{
  //     dispatch(setFriends)(prev=>({...prev, ...res.data}))    
  //   })}



  return (
    <div className="friend-request">
      {props.user}{" "}
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
