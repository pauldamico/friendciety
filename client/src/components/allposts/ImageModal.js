import React, {useContext} from "react";
import { PostContext } from "../../context/postProvider";
export default function ImageModal(props) {
    const {imageInfo, addImageChangeHandler, addImageToFeed} = useContext(PostContext)

    function addToFeed(event){
      event.preventDefault()
        addImageToFeed()
        props.toggleImage()
    }

  return (
    <div className={"image-modal-div"}>
   
        <form className="flexbox" encType="multipart/form-data" onSubmit={addToFeed} >
        <input name="post" value={imageInfo.post} onChange={addImageChangeHandler} type="text" />
        <input name="image" value={imageInfo.file} onChange={addImageChangeHandler} type="file" accept="image/png, image/jpeg" />
        <button type="submit" style={{cursor:"pointer", width:"100%", textAlign:"center"}}>Submit</button>
        </form>
   
      <p onClick={props.toggleImage}>Close</p>
    </div>
  );
}
