import React, {useState, useEffect, createContext} from "react";
import axios from "axios";

const MyFeedContext = createContext()
function MyFeedContextProvider (props){

    const userId = "63675bf17160b45ef19c5c44";
    const [myFeed, setMyFeed] = useState([]);
    const [addToFeed, setAddToFeed] = useState({ post: "" });
  
    useEffect(() => {
      axios.get(`/myFeed/${userId}`).then((res) => setMyFeed(res.data));
    }, []);
    console.log(myFeed);
  
    const addToMyFeed = () => {
      const postedItem = { post: addToFeed.post };
  
      axios
        .post(`/myFeed/${userId}`, postedItem)
        // .then(res=>setMyFeed(prev=>prev.map(item=>())))
        .then((res) => setMyFeed([...myFeed, res.data]));
      setAddToFeed((prev) => ({ post: "" }));
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
