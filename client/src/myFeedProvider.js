import React, {useState, useEffect, createContext, useContext} from "react";
import axios from "axios";
import { AuthContext } from "./authProvider";

const MyFeedContext = createContext()
function MyFeedContextProvider (props){
const {userId, token, logout, currentUser} = useContext(AuthContext) 

//Header Info for Axios users authentication
const config = {headers:{Authorization: `Bearer ${token}`}}

//State for myFeed array and state for addToFeed which is any new post change handler
    const [myFeed, setMyFeed] = useState([]);
    const [addToFeed, setAddToFeed] = useState({ post: "" }); 

  function getMyFeed (){
    setMyFeed([])
    token && axios.get(`/auth/myFeed/currentUserPosts`, config)    
    .then((res) => setMyFeed(prev=>(res.data)))
    .catch(err=>console.log(err));
      
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
    console.log(id)    
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
  }

useEffect(getMyFeed,[currentUser])

    return(
        <MyFeedContext.Provider value={{config, userId, myFeed, addToMyFeed, addPostChangeHandler, deletePost, updatePost, addToFeed}}>
{props.children}
        </MyFeedContext.Provider>
    )
}


export {MyFeedContext, MyFeedContextProvider}
