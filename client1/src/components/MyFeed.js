import React, { useState, useEffect } from "react";
import MyFeedPost from "./MyFeedPost";
import axios from "axios";

export default function MyFeed() {
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
  const myFeedElement = myFeed.map((feed) => (
    <MyFeedPost key={feed._id} {...feed} />
  ));
  const sortByPostTime = myFeedElement.sort(
    (a, b) => a.postOrder - b.postOrder
  );
  return (
    <div>
      <div>
        <input
          name="post"
          value={addToFeed.post}
          type="text"
          onChange={addPostChangeHandler}
        ></input>
        <button onClick={addToMyFeed}>Add to Feed</button>
      </div>
      <div>{sortByPostTime}</div>
    </div>
  );
}
