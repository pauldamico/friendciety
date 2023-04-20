import React, {useState, useEffect} from "react";
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux'
import { postsSlice } from "../../redux";

const {addPost} = postsSlice.actions

export default function ImageModal(props) {    
  const {currentUser} = useSelector(state=>state.currentUser)
  const {token} = currentUser || null
  const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState(null)
    const [imageInfo, setImageInfo] = useState({ post: "",image:null }); 
 

    //uploads image to backend/database
    const addImageToFeed = (event) => {
event.preventDefault()
      const formData = new FormData();
      formData.append("post", imageInfo.post);
      formData.append("image", imageInfo.image);  
    axios.post("/auth/post/addPost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }})
    .then(res => {    
      dispatch(addPost(res.data))
    })
    .catch(error => {
      console.log(error);
    })
    setImageInfo(prev=>({...prev, post:"", image:""}))
    props.toggleImage()
    setImageUrl(null)
    }

      //uploads image to backend/database
      const addVideoToFeed = (event) => {
        event.preventDefault()
              const formData = new FormData();
              formData.append("post", imageInfo.post);
              formData.append("image", imageInfo.image);  
            axios.post("/auth/post/addPost/video", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
              }})
            .then(res => {    
              dispatch(addPost(res.data))
            })
            .catch(error => {
              console.log(error);
            })
            setImageInfo(prev=>({...prev, post:"", image:""}))
            props.toggleVideo()
            setImageUrl(null)
            }

    //change handler for adding post and image
    const addImageChangeHandler = (event) => {
      const {name, value, type,  files} = event.target
      setImageInfo(prev=>({...prev, [name]:type==="file"? files[0]: value}))    
      } 
   

    const imageElement = imageUrl ? <img alt="" src={imageUrl} width="80%" height="50%"/> : <img alt=""  width="80%" height="50%"/>

   useEffect(()=>{ 
    const file = imageInfo.image
    const fileUrl = imageInfo.image ? URL.createObjectURL(file) : null
    setImageUrl(fileUrl);

   },[imageInfo.image])
  return (
    <div className={"image-modal-div"}>
   
        <form className="flexbox" encType="multipart/form-data" onSubmit={props.toggleImage ?addImageToFeed : addVideoToFeed} >
        <input required style ={{borderRadius:"10px", padding:"5px", marginBottom:"5px"}} placeholder="Add Description..." name="post" value={imageInfo.post} onChange={addImageChangeHandler} type="text" />
       { props.toggleImage ?<input name="image" value={imageInfo.file} onChange={addImageChangeHandler} type="file" accept="image/png, image/jpeg" />: null}
       { props.toggleVideo ?<input name="image" value={imageInfo.file} onChange={addImageChangeHandler} type="file" accept="video/x-matroska,video/mkv" />: null}
        <button  type="submit" style={{cursor:"pointer", width:"100%", textAlign:"center"}}>Submit</button>
        </form>
   {imageElement}
     { props.toggleImage ?<p onClick={props.toggleImage}>Close</p> : null}
     { props.toggleVideo ?<p onClick={props.toggleVideo}>Close</p> : null}
    </div>
  );
}
