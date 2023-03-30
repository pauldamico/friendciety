import React, {useState, useContext, useEffect} from "react";
import { PostContext } from "../../context/postProvider";
export default function ImageModal(props) {
    const {imageInfo, addImageChangeHandler, addImageToFeed} = useContext(PostContext)
    const [imageUrl, setImageUrl] = useState(null)

    function addToFeed(event){
      event.preventDefault()
        addImageToFeed()
        props.toggleImage()
        setImageUrl(null)
    }
 
  
  

    const imageElement = imageUrl ? <img src={imageUrl} width="80%" height="50%"/> : <img  width="80%" height="50%"/>

   useEffect(()=>{ 
    const file = imageInfo.image
    const fileUrl = imageInfo.image ? URL.createObjectURL(file) : null
    setImageUrl(fileUrl);

   },[addImageChangeHandler])
  return (
    <div className={"image-modal-div"}>
   
        <form className="flexbox" encType="multipart/form-data" onSubmit={addToFeed} >
        <input style ={{borderRadius:"10px", padding:"5px", marginBottom:"5px"}} placeholder="Add Description..." name="post" value={imageInfo.post} onChange={addImageChangeHandler} type="text" />
        <input name="image" value={imageInfo.file} onChange={addImageChangeHandler} type="file" accept="image/png, image/jpeg" />
        <button  type="submit" style={{cursor:"pointer", width:"100%", textAlign:"center"}}>Submit</button>
        </form>
   {imageElement}
      <p onClick={props.toggleImage}>Close</p>
    </div>
  );
}
