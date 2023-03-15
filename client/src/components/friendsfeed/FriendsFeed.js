import React,{useContext} from "react"
import Post from "../myfeed/Post"
import { FriendsFeedContext } from "../../context/friendsFeedProvider"
export default function FriendsFeed (){
const{friendsFeed} = useContext(FriendsFeedContext)
console.log(friendsFeed)
const testList = friendsFeed?.map(item=><Post key={item._id} {...item}/>)
    return(
      
            <div className="my-feed-div">
      {/* <img src={file}/> */}
      <div  >
        <form className="update-status-form" >
        <input className="update-status-input"
          name="post"
          placeholder="Update Status"
          
          type="text"
          
        />
        {/* <input  type="file" onChange={addImageHandler}/> */}
        {/* <button >Add to Feed</button> */}
        </form>
      </div>
   <div>{testList.reverse()}</div>
    </div>
           
      
    )
}