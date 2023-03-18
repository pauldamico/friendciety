import React, {useState} from "react"
import UpdatePostModal from "./UpdatePostModal"
import ReplyModal from "./ReplyModal"

export default function MyFeedPost (props){

    const [toggleEdit, setToggleEdit] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false)
  console.log(props)

//Moves cursor to reply input
function focusReplyInput(){  
    document.getElementById(`${props._id}reply-input`).focus()
}  

    const toggleEditHandler = () =>{
setToggleEdit(!toggleEdit)
    }
    const toggleMenuHandler = () =>{
        setToggleMenu(!toggleMenu)
            }

const replies= props.replies?.map(item=><div key ={item._id}><h4>{item.username}</h4><span >{item.reply}</span></div>)

    return (
        <div className="post-div">
        <div className="myfeed-posted-div" >     
   
            <div className ="myfeed-postproperty-div" >
            { !toggleEdit ?<> <section onClick ={toggleMenuHandler}>...</section> 
            <span>{props.username}</span>
            <h1>{props.post}</h1> 
            <div className="post-options-div">
            <h5>Like</h5>
            <h5 onClick={focusReplyInput}> Reply</h5>
            <h5>Dislike</h5>
            </div>
        <ReplyModal _id={props._id} />
            </>: null }
            { toggleEdit ? <div className="myfeed-input"><UpdatePostModal  post = {props.post} _id  ={props._id} updatePost={props.updatePost} toggleEditHandler={toggleEditHandler} toggleMenuHandler={toggleMenuHandler}/></div>: null }
            { toggleMenu && !toggleEdit ?  <div className="myfeed-post-edit-del-div">         
            { !toggleEdit ? <button onClick ={()=>{props.deletePost(props._id)}}>Delete</button>: null }
            { !toggleEdit ? <button onClick ={()=>{toggleEditHandler() }}>edit</button>: null }
            </div>: null }
     
            </div>
            <div className="reply-div">
                {replies.reverse()}
            </div>
            </div>
        </div>
    )
}