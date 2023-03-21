
import React,{useContext} from "react"
import Post from "./allposts/Post"

import { MyFeedContext } from "../context/myFeedProvider"


export default function Home (){
    
    const {myFeed, allFeed, addToMyFeed, addPostChangeHandler, deletePost, updatePost, addToFeed} = useContext(MyFeedContext)
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
                {/* <input  type="file" onChange={addImageHandler}/> */}
                {/* <button >Add to Feed</button> */}
                </form>
              </div>
           <div>{friendsPosts.reverse()}
           
           </div>
          
            </div>
                   
              
            )
        }
    
