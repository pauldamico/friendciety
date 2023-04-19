import React, { useEffect, useRef } from "react";
// import axios from "axios"
import Feed from "./Feed";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ApiCalls } from "./ApiCalls";

export default function Profile() {
  const count = useRef(0);
  const { getFriends } = ApiCalls();
  const { currentUser } = useSelector((state) => state.currentUser);
  const { friends } = useSelector((state) => state.friends);
  const { posts } = useSelector((state) => state.posts);
  const navigatedUser = useParams().userprofile;

  useEffect(() => {
    count.current = count.current + 1;
    getFriends();
  }, []);

  //maps combines all friends and username into one array
  const profile = friends?.friends
    ?.map((friend) => friend.user)
    .concat(currentUser?.user?.username);
  //shows posts according to the endpoint
  const userPosts =
    posts?.filter((post) => post.username === navigatedUser) || "";
  //shows the username according to the endpoint
  const selectedUser = profile?.find((user) => user === navigatedUser) || null;

  return (
    <div className="flexbox center">
      {navigatedUser === selectedUser && count.current > 1 ? (
        <>
          <div className="profile-div flexbox center">
            <h1>{navigatedUser.split("@")[0]}</h1>
            <img
              src={require("../images/red.jpg")}
              alt=""
              width="100px"
              height="100px"
              style={{ borderRadius: "100px" }}
            />
            {currentUser.user.username !== navigatedUser ? (
              <h3>Remove Friend</h3>
            ) : null}
          </div>
          <div>
            <Feed user={navigatedUser} feed={userPosts} />
          </div>
        </>
      ) : null}
      {navigatedUser !== selectedUser && count.current >= 1 ? (
        <div className="profile-div flexbox center">
          User must be a friend to view this page
        </div>
      ) : null}
    </div>
  );
}
