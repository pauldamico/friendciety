import React, {useContext} from "react";
import MyFeedPost from "./MyFeedPost";
import {MyFeedContext } from "../../myFeedProvider";

export default function MyFeed() {

  const {myFeed, addToMyFeed, addPostChangeHandler, deletePost, updatePost, addToFeed} = useContext(MyFeedContext)




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
