import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authProvider";

export default function SideBar() {
  const { currentUser, token } = useContext(AuthContext);
  return (
    <div className="sidebar-div">
      {token ? (
        <div>
          {token ? (
            <section className="profile-icon">
              {" "}
              <img
                src={require("../images/red.jpg")}
                height="20px"
                width="20px"
              />{" "}
              <section>{currentUser?.user?.username}</section>
            </section>
          ) : null}

          <div className="sidebar-div2">
            <Link to="/myfeed">My Posts</Link>
            <Link to="/friendfeed">Friends Posts</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
