import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";
import UpdatePostModal from "./UpdatePostModal";
import ReplyModal from "./ReplyModal";
import Comment from "./Comment";
import { useSelector, useDispatch } from "react-redux";
import { commentsSlice } from "../../redux/index";
import {postsSlice} from "../../redux/index"
import {Avatar} from '@mui/material'

//redux actions
const {addComment} = commentsSlice.actions
const {setPosts} = postsSlice.actions

export default function Post(props) {
const navigate = useNavigate() 
const dispatch = useDispatch()

//redux state
 const {currentUser} = useSelector((state)=>state.currentUser)
 const {comments} = useSelector(state=>state.comments)
 const {posts} = useSelector(state=>state.posts)




 const {token} = currentUser || null
 const [toggleEdit, setToggleEdit] = useState(false);
 const [toggleMenu, setToggleMenu] = useState(false);
 const [commentToggle, setCommentToggle] = useState(false);
 const [parentComment, setParentComment] = useState("");


 const config = {headers:{Authorization: `Bearer ${token}`}}
 
  //Moves cursor to comment input
  function focusCommentInput() {
    document.getElementById(`${props._id}comment-input`).focus();
  }

  //this allows the comments to show per prop post id
  const postComments =  Array.isArray(comments) && comments?.filter((item) => item.postId === props._id)
  const commentList = Array.isArray(postComments) && postComments.map((item) => <Comment key={item._id} {...item} />)

  //onChange for the input of the top level comment
  function parentCommentOnChange(e) {
    setParentComment(e.target.value);
  }
      //deletes a post by id
      const deletePost = (id) => {    
        axios.delete(`/auth/post/${id}`, config)
        .then(res=>dispatch(setPosts(posts.filter(post=>id !== post._id && {...post}))))
        .catch(err=>console.log(err))
      }
     
      //updates the post (component is UpdatePostModel.js)
      const updatePost = (id, editedPost)=>{   
        const updatedPost= {post:editedPost}
        console.log(updatedPost)
      axios.put(`/auth/post/${id}`, updatedPost, config)
      .then(res=>dispatch(setPosts(posts.map(post=>props._id === post._id ? {...post, post:editedPost} : {...post}))))
      .catch(err=>console.log(err))  
      }

    //add comment to post   need to setup authentcation for only friends posts
    const postComment=(event)=>{  
      event.preventDefault()
    
      axios.post(`/auth/comment/${props._id}`, {comment:parentComment, postOwner:props.username}, config)
        .then(res=>{ 
          console.log(res.data)
       dispatch(addComment(res.data))
      })
    setParentComment("")
    }
  
    //opens edit modal
  const toggleEditHandler = () => {
    setToggleEdit(!toggleEdit);
  };
  //opens ... modal
  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };

    //adds like to post  can prob make this reusable with likes
    const addLikeToPost =()=>{      
      axios.post(`/auth/post/like`, {id:props._id}, config)
      .then(res=>{      
        posts.find(post=>post._id === props._id) &&
        dispatch(setPosts(posts.map(post=>post._id === props._id  ? {...post, likes:[...res.data.likes], dislikes:[...res.data.dislikes]}  : post)))
      })}

    //adds dislike to post  can prob make this reusable with likes
  const addDislikeToPost =()=>{  
    axios.post(`/auth/post/dislike`, {id:props._id}, config)
    .then(res=>{
      posts.find(post=>post._id === props._id) &&
      dispatch(setPosts(posts.map(post=>post._id === props._id  ? {...post, dislikes:[...res.data.dislikes], likes:[...res.data.likes]}  : post)))      
    })}

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
                            deletePost(props._id);
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
                    onClick={addLikeToPost}
                  />
                  {props.likes.length}
                </section>
                <section>
                  <HandThumbsDown
                    style={{ cursor: "pointer" }}
                    onClick={addDislikeToPost}
                  />
                  {props.dislikes.length}
                </section>
              </div>
              <div className="post-options-div">
                <h5 onClick={addLikeToPost} style={{ cursor: "pointer" }}>
                  Like
                </h5>
                <h5 style={{ cursor: "pointer" }} onClick={focusCommentInput}>
                  {" "}
                  Comment
                </h5>
                <h5 onClick={addDislikeToPost} style={{ cursor: "pointer" }}>
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
                updatePost={updatePost}
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

{/* This is a comment not a reply */}
        <ReplyModal
          reply={parentComment}
          onChange={parentCommentOnChange}
          onSubmit={postComment}
          _id={props._id}
        />
      </div>
    </div>
  );
}
