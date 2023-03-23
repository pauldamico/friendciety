import React, { useState, useContext} from "react";
import Post from "./Post";
import {MyFeedContext } from "../../context/myFeedProvider";
import ImageModal from "./ImageModal";
export default function MyFeed() {

  const {toggleAddImage, toggleImage, myFeed, addToMyFeed, addPostChangeHandler, deletePost, updatePost, addToFeed} = useContext(MyFeedContext)

  // const [file, setFile] = useState("")
  // function addImageHandler (event){
  // setFile(URL.createObjectURL(event.target.files[0]))
  // }



  const myFeedElement = myFeed?.map((feed) => (
    <Post key={feed._id} {...feed}  deletePost={deletePost} updatePost={updatePost}/>
  ));


  return (
  
    <div className="my-feed-div">
      {/* <img src={file}/> */}
      <div className="update-status-div" >
        <form className="update-status-form" onSubmit={addToMyFeed}>
        <input className="update-status-input"
          name="post"
          placeholder="Update Status"
          value={addToFeed.post}
          type="text"
          onChange={addPostChangeHandler}
        />
                   </form>
              <div className="image-video-div"> 
                <section onClick={toggleImage} style={{display:'flex'}}><img  height='15px' width='15px' src={require('../../images/picture.png')}/>Image</section>
               {toggleAddImage? <ImageModal toggleImage={toggleImage} toggleAddImage={toggleAddImage}/> : null}

                <section style={{display:'flex'}}><img  height='15px' width='15px' src={require('../../images/picture.png')}/>Video</section>
              </div>
      </div>
   <div>{myFeedElement.reverse()}</div>
    </div>
  
  );
}
