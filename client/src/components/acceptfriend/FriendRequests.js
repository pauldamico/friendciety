import React, { useState } from "react";
import FriendRequest from "./FriendRequest";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";

export default function FriendRequests() {
  const { friends } = useSelector((state) => state.friends);
  const [toggle, setToggle] = useState(false);

  function toggler() {
    setToggle(!toggle);
  }

  const friendRequests = friends?.friendRequest?.map((item) => (
    <FriendRequest key={item} user={item} />
  ));

  return (
    <div style={{ position: "absolute", left: "50vw" }}>
      <div onClick={toggler}>
        {friends?.friendRequest?.length > 0 ? (
          <section
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Badge badgeContent={friends?.friendRequest.length} color="primary">
              <img
                height="20px"
                width="20px"
                src={require("../../images/addFriend.png")}
              />
            </Badge>{" "}
          </section>
        ) : null}
        {toggle ? (
          <div className="friend-request-div">{friendRequests}</div>
        ) : null}
      </div>
    </div>
  );
}
