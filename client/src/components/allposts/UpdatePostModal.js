import React, {useState} from "react"


export default function UpdatePostModel (props) {

    const [updatePost, setUpdatedPost] = useState({editedPost:props.post})

    const editPostHandler = (event)=>{
        const {name, value} = event.target
        setUpdatedPost(prev=>({...prev, [name]:value}))
    }

    const savePost = () =>{
        props.updatePost(props._id, updatePost.editedPost)    
        // props.toggleMenuHandler()
        props.toggleEditHandler()
   

    }

    return (
        <div>
          <textarea className = "edited-myfeed-input" name="editedPost" type ="text" value={updatePost.editedPost} onChange={editPostHandler} />
          <button onClick={savePost}>Save</button>
        </div>
    )
}