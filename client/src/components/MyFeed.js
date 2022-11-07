import React, {useContext} from "react";
import MyFeedPost from "./MyFeedPost";
import {MyFeedContext } from "../myFeedContext";

export default function MyFeed() {

  const {myFeed, addToMyFeed, addPostChangeHandler, deletePost, updatePost, addToFeed} = useContext(MyFeedContext)

//   const userId = "63675bf17160b45ef19c5c44";
//   const [myFeed, setMyFeed] = useState([]);
//   const [addToFeed, setAddToFeed] = useState({ post: "" });

//   useEffect(() => {
//     axios.get(`/myFeed/${userId}`).then((res) => setMyFeed(res.data));
//   }, []);
//   console.log(myFeed);

//   const addToMyFeed = () => {
//     const postedItem = { post: addToFeed.post };

//     axios
//       .post(`/myFeed/${userId}`, postedItem)
//       // .then(res=>setMyFeed(prev=>prev.map(item=>())))
//       .then((res) => setMyFeed([...myFeed, res.data]));
//     setAddToFeed((prev) => ({ post: "" }));
//   };

//   const addPostChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setAddToFeed((prev) => ({ ...prev, [name]: value }));
//   };

// const deletePost = (id) => {
//   console.log(id)
//   axios.delete(`/myFeed/${id}`)
//   .then(res=>setMyFeed(prev=>prev.filter(post=>id !== post._id && {...post})))
// }

// const updatePost = (id, editedPost)=>{
//   const updatedPost= {post:editedPost}
// axios.put(`/myFeed/${id}`, updatedPost)
// .then(res=>setMyFeed(prev=>prev.map(post=>id === post._id ? {...post, post:editedPost} : {...post})))

// }


  const myFeedElement = myFeed.map((feed) => (
    <MyFeedPost key={feed._id} {...feed} deletePost={deletePost} updatePost={updatePost}/>
  ));


  return (
  
    <div className="my-feed-div">
      <div  >
        <form className="update-status-form" onSubmit={addToMyFeed}>
        <input className="update-status-input"
          name="post"
          placeholder="Update Status"
          value={addToFeed.post}
          type="text"
          onChange={addPostChangeHandler}
        ></input>
        {/* <button >Add to Feed</button> */}
        </form>
      </div>
      <div>{myFeedElement.reverse()}</div>
    </div>
  
  );
}
