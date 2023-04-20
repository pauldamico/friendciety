import React, {useState, useEffect} from "react";
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux'
import { postsSlice } from "../../redux";
import ReactPlayer from "react-player";

const {addPost} = postsSlice.actions

export default function FileModel(props) {    
  const {currentUser} = useSelector(state=>state.currentUser)
  const {token} = currentUser || null
  const dispatch = useDispatch()
    const [fileUrl, setFileUrl] = useState(null)
    const [fileInfo, setFileInfo] = useState({ post: "",file:null }); 
 

    //uploads image to backend/database
    const addImageToFeed = (event) => {
event.preventDefault()
      const formData = new FormData();
      formData.append("post", fileInfo.post);
      formData.append("file", fileInfo.file);  
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
    setFileInfo(prev=>({...prev, post:"", file:""}))
    props.toggleImage()
    setFileUrl(null)
    }

      //uploads file to backend/database
      const addVideoToFeed = (event) => {
        event.preventDefault()
              const formData = new FormData();
              formData.append("post", fileInfo.post);
              formData.append("file", fileInfo.file);  
            axios.post("/auth/post/addPost/video", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
              }})
            .then(res => {    
              console.log(res.data)
              dispatch(addPost(res.data))
            })
            .catch(error => {
              console.log(error);
            })
            setFileInfo(prev=>({...prev, post:"", file:""}))
            props.toggleVideo()
            setFileUrl(null)
            }

    //change handler for adding post and file
    const addFileChangeHandler = (event) => {
      const {name, value, type,  files} = event.target
      setFileInfo(prev=>({...prev, [name]:type==="file"? files[0]: value}))    
      } 
   

    const imageElement = fileUrl ? <img alt="" src={fileUrl} width="80%" height="50%"/> : <img alt=""  width="80%" height="50%"/>
    const videoElement = fileUrl ? <ReactPlayer url={fileUrl} width="80%" height="50%"/> : <img alt=""  width="80%" height="50%"/>

   useEffect(()=>{ 
    const currentFile = fileInfo.file
    const fileUrl = fileInfo.file ? URL.createObjectURL(currentFile) : null
    setFileUrl(fileUrl);

   },[fileInfo.file])
  return (
    <div className={"image-modal-div"}>
   
        <form className="flexbox" encType="multipart/form-data" onSubmit={props.toggleImage ?addImageToFeed : addVideoToFeed} >
        <input required style ={{borderRadius:"10px", padding:"5px", marginBottom:"5px"}} placeholder="Add Description..." name="post" value={fileInfo.post} onChange={addFileChangeHandler} type="text" />
       { props.toggleImage ?<input name="file" value={fileInfo.currentFile} onChange={addFileChangeHandler} type="file" accept="image/png, image/jpeg" />: null}
       { props.toggleVideo ?<input name="file" value={fileInfo.currentFile} onChange={addFileChangeHandler} type="file" accept="video/x-matroska,video/mkv,video/mp4" />: null}
        <button  type="submit" style={{cursor:"pointer", width:"100%", textAlign:"center"}}>Submit</button>
        </form>
       { props.toggleImage ?imageElement : videoElement}
     { props.toggleImage ?<p onClick={props.toggleImage}>Close</p> : null}
     { props.toggleVideo ?<p onClick={props.toggleVideo}>Close</p> : null}
    </div>
  );
}
