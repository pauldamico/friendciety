import React,{useContext} from "react"
import Post from "../allposts/Post"
import ImageModal from "../allposts/ImageModal"
import { MyFeedContext } from "../../context/myFeedProvider"
import { AuthContext } from "../../context/authProvider"
export default function FriendsFeed (){
const{currentUser} = useContext(AuthContext)

const {myFeed, toggleImage, toggleAddImage, addToMyFeed, addPostChangeHandler, deletePost, updatePost, addToFeed} = useContext(MyFeedContext)

//This will only show posts for any posts that do not match current user Id
const posts = myFeed?.map(post=>post.userId !== currentUser.user._id ? <Post key={post._id}deletePost={deletePost} updatePost={updatePost} {...post}/> : null)
    return(
      
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
   <div>{posts.reverse()}
   
   </div>
  
    </div>
           
      
    )
}