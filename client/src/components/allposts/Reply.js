import ReplyModal from "./ReplyModal"
import React, {useState} from "react";
export default function Reply (props){
    
    const [toggle, setToggle] = useState(false)

    return (
        <div>
         <div className="comment-div" >
            <img src = {require("../../images/red.jpg")} height="20px" width="20px"/>
      <div className="comment-div2">
        
        <h4 > <section>{props.username}</section></h4>
        <span>{props.reply}</span>
      </div>
      
      </div>
      <div className="reply-div">
      <section style={{cursor:"pointer"}} onClick={()=>{setToggle(!toggle)}}>Reply</section> 
      {toggle ?<div className="reply-input-div" style={{background:"none", marginRight:"0"}}>
      <ReplyModal placeHolder="Write a Reply..."/>
      </div> : null}
      </div>
    </div>)
}