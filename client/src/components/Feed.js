import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./allposts/Post";
import ImageModal from "./allposts/ImageModal";
import { useDispatch, useSelector } from "react-redux";
import {
  postsSlice
} from "../redux";
import { ApiCalls } from "./ApiCalls";

const { addPost } = postsSlice.actions;


export default function Feed(props) {
  const dispatch = useDispatch();
  const { getPosts, getComments, getReplies, getFriends } = ApiCalls();
  const { currentUser } = useSelector((state) => state.currentUser);
  const { token } = currentUser || null;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const [toggleAddImage, setToggleAddImage] = useState(false);
  const [toggleAddVideo, setToggleAddVideo] = useState(false);

  const [addToFeed, setAddToFeed] = useState({ post: "" });
  //this will show friends and current user posts
  const posts = props.feed?.map((item) => <Post key={item._id} {...item} />);

  function toggleImage() {
    setToggleAddImage(!toggleAddImage);
  }
  function toggleVideo() {
    setToggleAddVideo(!toggleAddVideo);
  }
  const addToMyFeed = (event) => {
    event.preventDefault();
    axios
      .post(`/auth/post/addPost`, addToFeed, config)
      .then((res) => dispatch(addPost(res.data)))
      .catch((err) => console.log(err));
    setAddToFeed({ post: "" });
  };

  const addPostChangeHandler = (event) => {
    const { name, value } = event.target;
    setAddToFeed((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getPosts();
    getComments();
    getReplies();
    getFriends();
  }, []);
  return (
    <div className="my-feed-div">
      {props.user === currentUser.user.username ? (
        <div className="update-status-div">
          <form className="update-status-form" onSubmit={addToMyFeed}>
            <input
              className="update-status-input"
              name="post"
              placeholder="Update Status"
              value={addToFeed.post}
              type="text"
              onChange={addPostChangeHandler}
            />
          </form>
          <div className="image-video-div">
            <section onClick={toggleImage} style={{ display: "flex" }}>
              <img
              alt=""
                height="15px"
                width="15px"
                src={require("../images/picture.png")}
              />
              Image
            </section>
            {toggleAddImage ? (
              <ImageModal
              toggleImage={toggleImage}
                toggleAddFile={toggleAddImage}
              />
            ) : null}
            <section onClick={toggleVideo} style={{ display: "flex" }}>
              <img
                  alt=""
                height="15px"
                width="15px"
                src={require("../images/picture.png")}
              />
              Video
            </section>
            {toggleAddVideo ? (
              <ImageModal
              toggleVideo={toggleVideo}
              toggleAddVideo={toggleAddVideo}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="my-feed-div"></div>
      )}
      <div>{posts?.map((post) => post).reverse()}</div>
    </div>
  );
}
