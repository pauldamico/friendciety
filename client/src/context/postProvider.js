import React, {useState, useEffect, createContext, useContext} from "react";
import axios from "axios";
import { AuthContext } from "./authProvider";


const PostContext = createContext()
function PostContextProvider (props){

const { config, token, logout} = useContext(AuthContext) 

//State for myFeed array and state for addToFeed which is any new post change handler
    // const [myFeed, setMyFeed] = useState([]);
    // const [toggleAddImage,setToggleAddImage] = useState(false)
    // const [addToFeed, setAddToFeed] = useState({ post: "" }); 
    // const [imageInfo, setImageInfo] = useState({ post: "",image:null }); 
    // const [comments, setComments] = useState([])
    // const [replies, setReplies] = useState([])

  
  // function getMyFeed (){
  //   // setMyFeed([])
  //   token && axios.get(`/auth/post/currentUserPosts`, config)    
  //   .then((res) => setMyFeed((res.data)))
  //   .catch(err=>console.log(err));      
  // }

  // // set feed to a empty array when logout is clicked
  // function clearMyFeed(){
  //   setMyFeed([])
  // }

  //adds new post for current user
    // const addToMyFeed = (event) => {
    //   event.preventDefault()    
    //   axios.post(`/auth/post/addPost`, addToFeed, config)    
    //     .then((res) => setMyFeed(prev=>([...prev, res.data])))
    //     .catch(err=>console.log(err));
    //     setAddToFeed({ post: "" })          
    // };

  //   //adds like to post  can prob make this reusable with likes
  //   const addLikeToPost =(currentPostId)=>{      
  //     axios.post(`/auth/post/like`, {id:currentPostId}, config)
  //     .then(res=>{console.log(res.data.likes)
  //       myFeed.find(post=>post._id === currentPostId) &&
  //       setMyFeed(prev=>prev.map(post=>post._id === currentPostId  ? {...post, likes:[...res.data.likes], dislikes:[...res.data.dislikes]}  : post))    
  //     })

  //   }
  //   //adds dislike to post  can prob make this reusable with likes
  // const addDislikeToPost =(currentPostId)=>{  
  //   axios.post(`/auth/post/dislike`, {id:currentPostId}, config)
  //   .then(res=>{console.log(res.data.dislikes)
  //     myFeed.find(post=>post._id === currentPostId) &&
  //     setMyFeed(prev=>prev.map(post=>post._id === currentPostId  ? {...post, dislikes:[...res.data.dislikes], likes:[...res.data.likes]}  : post))    
  //   // console.log(myFeed.find(post=>post._id === currentPostId))
  //   })

  //   }
    
    //change handler for adding new post
    // const addPostChangeHandler = (event) => {    
    //   const { name, value } = event.target;    
    //   setAddToFeed((prev) => ({ ...prev, [name]: value }));
    // };
    // //change handler for adding post and image
    // const addImageChangeHandler = (event, post, file) => {
    //   const {name, value, type,  files} = event.target
    //   setImageInfo(prev=>({...prev, [name]:type==="file"? files[0]: value}))    
    //   } 
 

    //deletes a post by id
  // const deletePost = (id) => {    
  //   axios.delete(`/auth/post/${id}`, config)
  //   .then(res=>setMyFeed(prev=>prev.filter(post=>id !== post._id && {...post})))
  //   .catch(err=>console.log(err))
  // }
  
  // //updates the post (component is UpdatePostModel.js)
  // const updatePost = (id, editedPost)=>{   
  //   const updatedPost= {post:editedPost}
  //   console.log(updatedPost)
  // axios.put(`/auth/post/${id}`, updatedPost, config)
  // .then(res=>setMyFeed(prev=>prev.map(post=>id === post._id ? {...post, post:editedPost} : {...post})))
  // .catch(err=>console.log(err))  
  // }

// // get all comments for user and user's friends
// const getComments = ()=>{
//   axios.get('/auth/comment', config)
//   .then(res=>{setComments(res.data)})
//   .catch(err=>console.log(err))
// }
// // get all replies 
// const getReplies = ()=>{
//   axios.get('/auth/reply', config)
//   .then(res=>{setReplies(res.data)})
//   .catch(err=>console.log(err))
// }

//   //add comment to post   need to setup authentcation for only friends posts
//   const postComment=(postId, comment, postOwner)=>{
// axios.post(`/auth/comment/${postId}`, {comment:comment, postOwner:postOwner}, config)
//   .then(res=>{ 
//  setComments(prev=>[...prev, res.data])
// })}

//   //add reply to comment or reply
// const postReply =(commentId, reply, postOwner)=>{
//   axios.post(`/auth/reply/${commentId}`, {reply, postOwner}, config)
//   .then(res=>{ 
//  setReplies(prev=>[...prev, res.data])
//   // updateFriendFeedComments(postId, res.data)
// })}

    // //uploads image to backend/database
    // const addImageToFeed = () => {
    //   const formData = new FormData();
    //   formData.append("post", imageInfo.post);
    //   formData.append("image", imageInfo.image);  
    // axios.post("/auth/post/addPost", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: `Bearer ${token}`
    //   }})
    // .then(res => {
    //   console.log(res.data);
    //   setMyFeed(prev=>([...prev, res.data]))
    // })
    // .catch(error => {
    //   console.log(error);
    // })
    // setImageInfo(prev=>({...prev, post:"", image:""}))
    // }

//toggle image model
// function toggleImage (){
//   setToggleAddImage(!toggleAddImage)
//   setImageInfo( prev=>({...prev, post: "",image:null}))
// }

// useEffect(()=>{
//  token && getComments()
//  token && getMyFeed()
//  token && getReplies() 
//  // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [logout])

    return(
        <PostContext.Provider value={{}}>
{props.children}
        </PostContext.Provider>
    )}


export {PostContext, PostContextProvider}
