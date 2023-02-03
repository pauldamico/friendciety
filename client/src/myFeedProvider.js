import React, {useState, useEffect, createContext, useContext} from "react";
import axios from "axios";
import { AuthContext } from "./authProvider";

const MyFeedContext = createContext()
function MyFeedContextProvider (props){
const {userId, token, logout} = useContext(AuthContext) 

//Header Info for Axios users authentication
const config = {headers:{Authorization: `Bearer ${token}`}}

//State for myFeed array and state for addToFeed which is any new post change handler
    const [myFeed, setMyFeed] = useState([]);
    const [addToFeed, setAddToFeed] = useState({ post: "" });
  

    //gets current logged in user MyFeed posts.  Logout triggers it to render again so it changes on new user login
    useEffect(() => {    
      setMyFeed([])  
      token && axios.get(`/auth/myFeed/currentUserPosts`, config)
      .then((res) => setMyFeed(res.data));
    }, [logout]);

  
    const addToMyFeed = (event) => {
      event.preventDefault()    
      axios
        .post(`/auth/myFeed/addPost`, addToFeed, config)
        // .then(res=>setMyFeed(prev=>prev.map(item=>())))
        .then((res) => setMyFeed(prev=>([...prev, res.data])))
        .catch(err=>console.log(err));
        setAddToFeed({ post: "" })
       
    };
    
 


    const addPostChangeHandler = (event) => {
      const { name, value } = event.target;
      setAddToFeed((prev) => ({ ...prev, [name]: value }));
    };
  
  const deletePost = (id) => {
    console.log(id)
    axios.delete(`/myFeed/${id}`)
    .then(res=>setMyFeed(prev=>prev.filter(post=>id !== post._id && {...post})))

  }
  
  const updatePost = (id, editedPost)=>{
    const updatedPost= {post:editedPost}
  axios.put(`/myFeed/${id}`, updatedPost)
  .then(res=>setMyFeed(prev=>prev.map(post=>id === post._id ? {...post, post:editedPost} : {...post})))
  
  }



    return(
        <MyFeedContext.Provider value={{userId, myFeed, addToMyFeed, addPostChangeHandler, deletePost, updatePost, addToFeed}}>
{props.children}
        </MyFeedContext.Provider>
    )
}


export {MyFeedContext, MyFeedContextProvider}
