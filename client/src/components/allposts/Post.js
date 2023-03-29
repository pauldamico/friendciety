import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";
import UpdatePostModal from "./UpdatePostModal";
import ReplyModal from "./ReplyModal";
import Comment from "./Comment";
import { PostContext } from "../../context/postProvider";
import { AuthContext } from "../../context/authProvider";
import {Avatar} from '@mui/material'

export default function Post(props) {
const navigate = useNavigate()
  const { addLikeToPost, addDislikeToPost, postComment, comments } =    useContext(PostContext);
  const {currentUser} = useContext(AuthContext)
  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);
  const [parentComment, setParentComment] = useState("");
  //Moves cursor to comment input
  function focusCommentInput() {
    document.getElementById(`${props._id}comment-input`).focus();
  }

  //this allows the comments to show per prop post id
  const postComments =
    comments.filter((item) => item.postId === props._id) || null;
  const commentList =
    postComments.map((item) => <Comment key={item._id} {...item} />) || null;

  //onChange for the input of the top level comment
  function parentCommentOnChange(e) {
    setParentComment(e.target.value);
  }
  //submit for the input of the top level comment
  function submitParentComment(e) {
    e.preventDefault();
    postComment(props._id, parentComment);
    setParentComment("");
  }

  const toggleEditHandler = () => {
    setToggleEdit(!toggleEdit);
  };
  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  function likePost() {
    addLikeToPost(props._id, props.username);
  }
  function dislikePost() {
    addDislikeToPost(props._id, props.username);
  }

  return (
    <div className="post-div">
      <div className="myfeed-posted-div">
        <div className="myfeed-postproperty-div">
          {!toggleEdit ? (
            <>
              <div
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                className="flexbox"
              >
                <div>
                  <span  onClick={()=>{navigate(`/profile/${props.username}`)}} style={{cursor:"pointer"}} className="profile-icon">
                    <Avatar  sx={{ width: 24, height: 24 }}
                      src={require("../../images/red.jpg")}
                     
                      height="20px"
                      width="20px"
                    />{" "}
                    <section>{props.username}</section>
                  </span>
                </div>
                {currentUser?.user._id === props.userId
                 ?
                <section
                  style={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginRight: "1vw",
                  }}
                  onClick={toggleMenuHandler}
                >
                  ...{" "}
                  {toggleMenu && !toggleEdit ? (
                    <div className="myfeed-post-edit-del-div">
                      {!toggleEdit ? (
                        <h3
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            props.deletePost(props._id);
                          }}
                        >
                          Delete
                        </h3>
                      ) : null}
                      {!toggleEdit ? (
                        <h3
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            toggleEditHandler();
                          }}
                        >
                          edit
                        </h3>
                      ) : null}
                    </div>
                  ) : null}
                </section> 
                : 
                <section></section>}
              </div>

              <h1>{props.post}</h1>
              {props.image ? (
                <img src={`/uploads/${props.username}/postedimages/${props.image}`} />
              ) : null}

                                                                                  {/* likes and dislikes */}
              <div style={{ marginTop: "1vh" }} className={"flexbox row"}>
                <section>
                  <HandThumbsUp
                    style={{ cursor: "pointer" }}
                    onClick={likePost}
                  />
                  {props.likes.length}
                </section>
                <section>
                  <HandThumbsDown
                    style={{ cursor: "pointer" }}
                    onClick={dislikePost}
                  />
                  {props.dislikes.length}
                </section>
              </div>
              <div className="post-options-div">
                <h5 onClick={likePost} style={{ cursor: "pointer" }}>
                  Like
                </h5>
                <h5 style={{ cursor: "pointer" }} onClick={focusCommentInput}>
                  {" "}
                  Comment
                </h5>
                <h5 onClick={dislikePost} style={{ cursor: "pointer" }}>
                  Dislike
                </h5>
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
        </div>

        <div>
          {postComments?.length > 1 ? (
            <div>
              {commentToggle ? (
                <div>
                  <section
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setCommentToggle(!commentToggle);
                    }}
                  >
                    Hide Comments
                  </section>
                  {commentList}
                </div>
              ) : (
                <section
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setCommentToggle(!commentToggle);
                  }}
                >
                  Comments {postComments.length}
                </section>
              )}
            </div>
          ) : (
            commentList
          )}
        </div>

        <ReplyModal
          reply={parentComment}
          onChange={parentCommentOnChange}
          onSubmit={submitParentComment}
          _id={props._id}
        />
      </div>
    </div>
  );
}
