import ReplyModal from "./ReplyModal"
import React, {useState, useContext} from "react";
import Reply from "./Reply";
import {MyFeedContext } from "../../context/myFeedProvider";
export default function Comment (props){
 
    const {postReply, replies} = useContext(MyFeedContext)
    const [commentToggle, setCommentToggle] = useState(false)
    const [replyToggle, setReplyToggle] = useState(false)
    const [reply, setReply] = useState("");

    function replyOnChange (e){
        setReply(e.target.value)        
    }
 function replyOnSubmit (e){
    e.preventDefault()
    postReply(props._id, reply)
    setReply("")
 }

 //replies
const currentCommentReplies = replies.filter(reply=>reply.commentId === props._id)
const listedReplies = currentCommentReplies.map(reply=><Reply key={reply._id} {...reply}/>)

    //onSubmit
    return (
        <div>      
         <div className="comment-div" >
            <img src = {require("../../images/red.jpg")} height="20px" width="20px"/>
      <div className="comment-div2">        
        <h4 > <section>{props.username}</section></h4>
        <span>{props.comment}</span>
      </div>      
      </div>
      <div className="reply-div">
      <section style={{cursor:"pointer"}} onClick={()=>{setCommentToggle(!commentToggle)}}>Reply</section> 
      {commentToggle ?<div className="reply-input-div" style={{background:"none", marginRight:"0"}}>
      <ReplyModal onSubmit={replyOnSubmit} onChange={replyOnChange} reply={reply} placeHolder="Write a Reply..."/>
      </div> : null}


      <div >{listedReplies?.length > 4 ? <div  >{replyToggle ? <div><section style={{cursor:"pointer"}} onClick = {()=>{setReplyToggle(!replyToggle)}} >Hide Replies</section>
        {listedReplies}
        </div> : <section style={{cursor:"pointer"}} onClick = {()=>{setReplyToggle(!replyToggle)}}>Replies {listedReplies.length}</section>}</div> :  listedReplies}</div>
     
     
     
     
      </div>
    </div>)
}