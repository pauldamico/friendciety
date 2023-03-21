import React, {useState, useEffect, createContext, useContext} from "react";
import {useNavigate}  from 'react-router-dom'
import axios from "axios";
import { AuthContext } from "./authProvider";
import { FriendsFeedContext } from "./friendsFeedProvider";

const MyFeedContext = createContext()
function MyFeedContextProvider (props){
  const navigate = useNavigate()
const {userId, token, logout, currentUser} = useContext(AuthContext) 
const {friendsFeed, updateFriendFeedReplys} = useContext(FriendsFeedContext)

//Header Info for Axios users authentication
const config = {headers:{Authorization: `Bearer ${token}`}}

//State for myFeed array and state for addToFeed which is any new post change handler
    const [myFeed, setMyFeed] = useState([]);
    const [addToFeed, setAddToFeed] = useState({ post: "" }); 
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
    
    //change handler for adding new post
    const addPostChangeHandler = (event) => {
      const { name, value } = event.target;
      setAddToFeed((prev) => ({ ...prev, [name]: value }));
    };
  
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

  //add reply to post
  const replyToPost=(parentId, reply)=>{

axios.put(`/auth/myfeed/reply/${parentId}`, {replies:[{reply}]}, config)
  .then(res=>{setMyFeed(prev=>prev.map(item=>
    item._id === parentId ? {...item, 
    replies:res.data
  } : item))
  updateFriendFeedReplys(parentId, res.data)
})

console.log(myFeed)

  }

useEffect(()=>{
  getMyFeed()
}, [logout])

    return(
        <MyFeedContext.Provider value={{allFeed, replyToPost, clearMyFeed, getMyFeed, config, userId, myFeed, addToMyFeed, addPostChangeHandler, deletePost, updatePost, addToFeed}}>
{props.children}
        </MyFeedContext.Provider>
    )
}


export {MyFeedContext, MyFeedContextProvider}
