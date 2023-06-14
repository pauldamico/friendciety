import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import ReactPlayer from "react-player";
import ImageModal from "./ImageModal";

export default function UpdatePostModel(props) {
  console.log(props.image);

  const [updatePost, setUpdatedPost] = useState({
    editedPost: props.post,
    editedVideo: props.video,
  });

  const editPostHandler = (event) => {
    const { name, value } = event.target;
    setUpdatedPost((prev) => ({ ...prev, [name]: value }));
  };

  const savePost = () => {
    props.updatePost(props._id, updatePost.editedPost);
    props.toggleEditHandler();
  };

  return (
    <div>
      <TextField
        id="outlined-multiline-flexible"
        label="Edit Post"
        multiline
        maxRows={4}
        className="edited-myfeed-input"
        name="editedPost"
        type="text"
        value={updatePost.editedPost}
        onChange={editPostHandler}
      />
    {props.image ? (
                <img height="100%" width="100%" onClick={props.openImageResize} alt="" src={`/uploads/${props.username}/postedimages/${props.image}`} />
              ) : null}
           
      {props.video ? (
        <ReactPlayer
          style={{ cursor: "pointer" }}
          width="100%"
          height="100%"
          url={`/uploads/${props.username}/postedvideos/${updatePost.editedVideo}`}
          controls
        />
      ) : null}

      <Button variant="contained" onClick={savePost}>
        Save
      </Button>
    </div>
  );
}
