import ReplyModal from "./ReplyModal"
import React, {useState} from "react";
import Reply from "./Reply";
import axios from "axios";
import {useSelector} from 'react-redux'
import { repliesSlice } from "../../redux";


const {setReplies} = repliesSlice.actions

export default function Comment (props){   
    const {replies} = useSelector(state=>state.replies)
    const {currentUser} = useSelector(state=>state.currentUser)
    const [commentToggle, setCommentToggle] = useState(false)
    const [replyToggle, setReplyToggle] = useState(false)
    const [reply, setReply] = useState("");
    const config = {headers:{Authorization: `Bearer ${token}`}}
    const { token } = currentUser || null;

    
    function replyOnChange (e){
        setReply(e.target.value)        
    }

//  function replyOnSubmit (e){
//     e.preventDefault()
//     postReply(props._id, reply, props.postOwner)
//     setReply("")
//  }

   //add reply to comment or reply
const postReply =(e)=>{  
  e.preventDefault()
  const postOwner = props.postOwner || null
  axios.post(`/auth/reply/${props._id}`, {reply, postOwner}, config)
  .then(res=>{ 
 setReplies(prev=>[...prev, res.data])
 setReply("")
  // updateFriendFeedComments(postId, res.data)
})}

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
      <ReplyModal onSubmit={postReply} onChange={replyOnChange} reply={reply} placeHolder="Write a Reply..."/>
      </div> : null}


      <div >{listedReplies?.length > 4 ? <div  >{replyToggle ? <div><section style={{cursor:"pointer"}} onClick = {()=>{setReplyToggle(!replyToggle)}} >Hide Replies</section>
        {listedReplies}
        </div> : <section style={{cursor:"pointer"}} onClick = {()=>{setReplyToggle(!replyToggle)}}>Replies {listedReplies.length}</section>}</div> :  listedReplies}</div>
     
     
     
     
      </div>
    </div>)
}