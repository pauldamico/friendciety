import React, {useState} from "react"
import UpdatePostModel from "./UpdatePostModel"
import ReplyModel from "./ReplyModel"

export default function MyFeedPost (props){

    const [toggleEdit, setToggleEdit] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false)


    const toggleEditHandler = () =>{
setToggleEdit(!toggleEdit)
    }
    const toggleMenuHandler = () =>{
        setToggleMenu(!toggleMenu)
            }

    return (
        <div className="myfeed-posted-div" >
        
   
            <div className ="myfeed-postproperty-div" >
            { !toggleEdit ?<> <section onClick ={toggleMenuHandler}>...</section> 
            <span>{props.username}</span>
            <h1>{props.post}</h1> 
            <div className="post-options-div">
            <h5>Like</h5>
            <h5>Reply</h5>
            <h5>Dislike</h5>
            </div>
        <ReplyModel />
            </>: null }
            { toggleEdit ? <div className="myfeed-input"><UpdatePostModel post = {props.post} _id  ={props._id} updatePost={props.updatePost} toggleEditHandler={toggleEditHandler} toggleMenuHandler={toggleMenuHandler}/></div>: null }
            { toggleMenu ?  <div className="myfeed-post-edit-del-div">         
            { !toggleEdit ? <button onClick ={()=>{props.deletePost(props._id)}}>Delete</button>: null }
            { !toggleEdit ? <button onClick ={toggleEditHandler}>edit</button>: null }
            </div>: null }
        
            </div>
           
        </div>
    )
}