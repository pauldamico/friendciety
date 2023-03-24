import React, {useState, useEffect, createContext, useContext} from "react";
import axios from "axios";
import { AuthContext } from "./authProvider";
import { FriendsFeedContext } from "./friendsFeedProvider";

const MyFeedContext = createContext()
function MyFeedContextProvider (props){

const {userId, token, logout, currentUser} = useContext(AuthContext) 
const {friendsFeed, updateFriendFeedComments} = useContext(FriendsFeedContext)

//Header Info for Axios users authentication
const config = {headers:{Authorization: `Bearer ${token}`}}

//State for myFeed array and state for addToFeed which is any new post change handler
    const [myFeed, setMyFeed] = useState([]);
    const [toggleAddImage,setToggleAddImage] = useState(false)
    const [addToFeed, setAddToFeed] = useState({ post: "" }); 
    const [imageInfo, setImageInfo] = useState({ post: "",image:"" }); 
    const [comments, setComments] = useState([])
    const [replies, setReplies] = useState([])
    const allFeed = [...friendsFeed, ...myFeed].sort((a,b)=>a.postOrder - b.postOrder) || null
   
  function getMyFeed (){
    // setMyFeed([])
    token && axios.get(`/auth/myFeed/currentUserPosts`, config)    
    .then((res) => setMyFeed(prev=>(res.data)))
    .catch(err=>console.log(err));      
  }

  // set feed to a empty array when logout is clicked
  function clearMyFeed(){
    setMyFeed([])
  }

  //adds new post for current user
    const addToMyFeed = (event) => {
      event.preventDefault()    
      axios.post(`/auth/myFeed/addPost`, addToFeed, config)    
        .then((res) => setMyFeed(prev=>([...prev, res.data])))
        .catch(err=>console.log(err));
        setAddToFeed({ post: "" })          
    };

const addImageToFeed = () => {
  const formData = new FormData();
  formData.append("post", imageInfo.post);
  formData.append("image", imageInfo.image);
  console.log(formData.getAll("image"));

axios.post("/auth/myFeed/addPost", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`
  }
})
.then(res => {
  console.log(res.data);
  setMyFeed(prev=>([...prev, res.data]))
})
.catch(error => {
  console.log(error);
})
setImageInfo(prev=>({...prev, post:"", image:""}))
}
    
    //change handler for adding new post
    const addPostChangeHandler = (event) => {    
      const { name, value } = event.target;    
      setAddToFeed((prev) => ({ ...prev, [name]: value }));
    };
    //
    const addImageChangeHandler = (event) => {
      const {name, value, type,  files} = event.target
      setImageInfo(prev=>({...prev, [name]:type=="file"? files[0]: value}))
    
      } 
 

    //deletes a post by id
  const deletePost = (id) => {    
    axios.delete(`/auth/myfeed/${id}`, config)
    .then(res=>setMyFeed(prev=>prev.filter(post=>id !== post._id && {...post})))
    .catch(err=>console.log(err))

  }
  
  //updates the post (component is UpdatePostModel.js)
  const updatePost = (id, editedPost)=>{   
    const updatedPost= {post:editedPost}
    console.log(updatedPost)
  axios.put(`/auth/myFeed/${id}`, updatedPost, config)
  .then(res=>setMyFeed(prev=>prev.map(post=>id === post._id ? {...post, post:editedPost} : {...post})))
  .catch(err=>console.log(err))  
  }

// get all comments for user and user's friends
const getComments = ()=>{
  axios.get('/auth/comment', config)
  .then(res=>{setComments(res.data)})
  .catch(err=>console.log(err))
}
// get all replies 
const getReplies = ()=>{
  axios.get('/auth/reply', config)
  .then(res=>{setReplies(res.data)})
  .catch(err=>console.log(err))
}

  //add comment to post   need to setup authentcation for only friends posts
  const postComment=(postId, comment)=>{
axios.post(`/auth/comment/${postId}`, {comment:comment}, config)
  .then(res=>{ 
 setComments(prev=>[...prev, res.data])
  // updateFriendFeedComments(postId, res.data)
})
  }

  //add reply to comment or reply
const postReply =(commentId, reply)=>{
  axios.post(`/auth/reply/${commentId}`, {reply}, config)
  .then(res=>{ 
 setReplies(prev=>[...prev, res.data])
  // updateFriendFeedComments(postId, res.data)
})
}

//toggle image model
function toggleImage (){
  setToggleAddImage(!toggleAddImage)
}

useEffect(()=>{
 token && getComments()
 token && getMyFeed()
 token && getReplies() 
}, [logout])

    return(
        <MyFeedContext.Provider value={{toggleImage, toggleAddImage, setToggleAddImage, addImageToFeed, imageInfo, addImageChangeHandler, replies, comments, postReply, allFeed, postComment, clearMyFeed, getMyFeed, config, userId, myFeed, addToMyFeed, addPostChangeHandler, deletePost, updatePost, addToFeed}}>
{props.children}
        </MyFeedContext.Provider>
    )
}


export {MyFeedContext, MyFeedContextProvider}
