import React, {useState, useContext} from "react";
import { MyFeedContext } from "../../context/myFeedProvider";
export default function ImageModal(props) {
    const {imageInfo, addToMyFeed, addImageChangeHandler, addImageToFeed} = useContext(MyFeedContext)
console.log("test")
    function addToFeed(event){
      event.preventDefault()
        addImageToFeed()
        props.toggleImage()
    }

  return (
    <div className="image-modal-div">
   
        <form encType="multipart/form-data" onSubmit={addToFeed} >
        <input name="post" value={imageInfo.post} onChange={addImageChangeHandler} type="text" />
        <input name="image" value={imageInfo.file} onChange={addImageChangeHandler} type="file" accept="image/png, image/jpeg" />
        <button type="submit" style={{cursor:"pointer", width:"100%", textAlign:"center"}}>Submit</button>
        </form>
   
      <p onClick={props.toggleImage}>Close</p>
    </div>
  );
}
