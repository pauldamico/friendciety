
import React,{useState,useContext} from "react"
import Post from "./allposts/Post"
import ImageModal from "./allposts/ImageModal"

import { MyFeedContext } from "../context/myFeedProvider"



export default function Home (){
    
    const {toggleImage, toggleAddImage, allFeed, addToMyFeed, addPostChangeHandler, deletePost, updatePost, addToFeed} = useContext(MyFeedContext)
    const friendsPosts = allFeed?.map(item=><Post key={item._id}deletePost={deletePost} updatePost={updatePost} {...item}/>)
  





    return (

     
              
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
                <section onClick={toggleImage} style={{display:'flex'}}><img  height='15px' width='15px' src={require('../images/picture.png')}/>Image</section>
               {toggleAddImage? <ImageModal toggleImage={toggleImage} toggleAddImage={toggleAddImage}/> : null}

                <section style={{display:'flex'}}><img  height='15px' width='15px' src={require('../images/picture.png')}/>Video</section>
              </div>
          
             
              </div>
           <div>{friendsPosts.reverse()}
           
           </div>
          
            </div>
                   
              
            )
        }
    
