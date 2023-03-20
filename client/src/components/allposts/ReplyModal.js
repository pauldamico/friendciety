import { set } from "mongoose";
import React, { useState, useContext } from "react";
import { MyFeedContext } from "../../context/myFeedProvider";
export default function ReplyModel(props) {
const{replyToPost} = useContext(MyFeedContext)

  const [reply, setReply] = useState("");

  function replyOnChange(e) {
    setReply(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
 replyToPost(props._id, reply)   
 setReply("")
  }

  return (
    <form onSubmit={onSubmit} className="reply-model-form">
      <input
      required
      id={`${props._id}reply-input`}
      value={reply}
        onChange={replyOnChange}
        type="text"
        placeholder="Write a Reply..."
      />
    </form>
  );
}
