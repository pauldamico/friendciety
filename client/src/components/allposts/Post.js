import React, { useState, useContext } from "react";
import UpdatePostModal from "./UpdatePostModal";
import ReplyModal from "./ReplyModal";
import Comment from "./Comment";
import { MyFeedContext } from "../../context/myFeedProvider";

export default function Post(props) {

  const{postComment, comments} = useContext(MyFeedContext)
  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false)
  const [parentComment, setParentComment] = useState("");
  

  //Moves cursor to comment input
  function focusCommentInput() {
    document.getElementById(`${props._id}comment-input`).focus();
  }

  //this allows the comments to show per prop post id
const postComments = comments.filter(item=>item.postId === props._id) || null
const commentList = postComments.map(item=><Comment key={item._id}{...item}/>) || null

//onChange for the input of the top level comment
  function parentCommentOnChange(e) {
    setParentComment(e.target.value);
  }
//submit for the input of the top level comment
  function submitParentComment(e) {    
    e.preventDefault();
    postComment(props._id, parentComment)   
 setParentComment("")

  }

  const toggleEditHandler = () => {
    setToggleEdit(!toggleEdit);
  };
  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  //Lists comments of posts
  // const comments = props.comments?.map((item) => (
  //   <Reply key={item._id} {...item}/>
  // ));

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
                <h5 style = {{cursor:"pointer"}} onClick={focusCommentInput}> Comment</h5>
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
      
        <div >{postComments?.length > 1 ? <div  >{commentToggle ? <div><section style={{cursor:"pointer"}} onClick = {()=>{setCommentToggle(!commentToggle)}} >Hide Comments</section>
        {commentList}
        </div> : <section style={{cursor:"pointer"}} onClick = {()=>{setCommentToggle(!commentToggle)}}>Comments {postComments.length}</section>}</div> :  commentList}</div>
        
        <ReplyModal reply={parentComment} onChange={parentCommentOnChange} onSubmit={submitParentComment} _id={props._id} />
      </div>
    </div>
  );
}
