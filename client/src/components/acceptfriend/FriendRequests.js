import React, { useState } from "react";
import FriendRequestModal from "./FriendRequestModal";

import { useSelector } from "react-redux";



export default function FriendRequests() {
  const { friends } = useSelector((state) => state.friends);
  const [toggle, setToggle] = useState(false);

  function toggler() {
    setToggle(!toggle);
  }



  return (
    <div >
        
      <div style ={{display:"flex"}}onClick={toggler}>

        {friends?.friendRequest?.length > 0 ? (
          <section 
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
              <FriendRequestModal friends={friends} />
    
          </section>
        ) : null}
        {/* {toggle ? (
        
          <div className="friend-request-div">{friendRequests}</div>
        ) : null} */}
      </div>
    </div>
  );
}
