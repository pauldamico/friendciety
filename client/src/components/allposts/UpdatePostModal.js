import React, {useState} from "react"
import { TextField, Button } from "@mui/material"

export default function UpdatePostModel (props) {

    const [updatePost, setUpdatedPost] = useState({editedPost:props.post})

    const editPostHandler = (event)=>{
        const {name, value} = event.target
        setUpdatedPost(prev=>({...prev, [name]:value}))
    }

    const savePost = () =>{
        props.updatePost(props._id, updatePost.editedPost)     
        props.toggleEditHandler()
   

    }

    return (
        <div>
          <TextField id="outlined-multiline-flexible"
label="Edit Post"
multiline
maxRows={4} className = "edited-myfeed-input" name="editedPost" type ="text" value={updatePost.editedPost} onChange={editPostHandler} />
          <Button variant="contained" onClick={savePost}>Save</Button>
        </div>
    )
}
