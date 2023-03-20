import React, { useState, useContext } from "react";
import UpdatePostModal from "./UpdatePostModal";
import ReplyModal from "./ReplyModal";
import Reply from "./Reply";
import { MyFeedContext } from "../../context/myFeedProvider";

export default function MyFeedPost(props) {

  const{replyToPost} = useContext(MyFeedContext)
  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [replyToggle, setReplyToggle] = useState(false)
  const [reply, setReply] = useState("");
  

  //Moves cursor to reply input
  function focusReplyInput() {
    document.getElementById(`${props._id}reply-input`).focus();
  }

  
//onChange for the input of the top level reply
  function parentReplyOnChange(e) {
    setReply(e.target.value);
  }
//submit for the input of the top level reply
  function submitParentReply(e) {
    e.preventDefault();
 replyToPost(props._id, reply)   
 setReply("")
  }

  const toggleEditHandler = () => {
    setToggleEdit(!toggleEdit);
  };
  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  //Lists replies of posts
  const replies = props.replies?.map((item) => (
    <Reply key={item._id} {...item}/>
  ));

  return (
    <div className="post-div">
      <div className="myfeed-posted-div">
        <div className="myfeed-postproperty-div">
          {!toggleEdit ? (
            <>
              {" "}
              <section onClick={toggleMenuHandler}>...</section>
              <span className="profile-icon"><img src = {require("../../images/red.jpg")} height="20px" width="20px"/> <section>{props.username}</section></span>
              <h1>{props.post}</h1>
              <div className="post-options-div">
                <h5>Like</h5>
                <h5 onClick={focusReplyInput}> Reply</h5>
                <h5>Dislike</h5>
              </div>
        
            </>
          ) : null}

          {toggleEdit ? (
            <div className="myfeed-input">
              <UpdatePostModal
                post={props.post}
                _id={props._id}
                updatePost={props.updatePost}
                toggleEditHandler={toggleEditHandler}
                toggleMenuHandler={toggleMenuHandler}
              />
            </div>
          ) : null}

          {toggleMenu && !toggleEdit ? (
            <div className="myfeed-post-edit-del-div">
              {!toggleEdit ? (
                <button
                  onClick={() => {
                    props.deletePost(props._id);
                  }}
                >
                  Delete
                </button>
              ) : null}
              {!toggleEdit ? (
                <button
                  onClick={() => {
                    toggleEditHandler();
                  }}
                >
                  edit
                </button>
              ) : null}
            </div>
          ) : null}

        </div>
        <div>{props.replies.length > 1 ? <div onClick = {()=>{setReplyToggle(!replyToggle)}} style={{cursor:"pointer"}}>{replyToggle ? <div><section onClick = {()=>{setReplyToggle(!replyToggle)}} >Hide Replies</section>{replies}</div> : `Replies ${props.replies.length}`}</div> :  replies}</div>
        <ReplyModal reply={reply} onChange={parentReplyOnChange} onSubmit={submitParentReply} _id={props._id} />
      </div>
    </div>
  );
}
