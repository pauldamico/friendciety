import ReplyModal from "./ReplyModal"
import React, {useState} from "react";
export default function Reply (props){
    
    const [toggle, setToggle] = useState(false)

    return (
         <div className="reply-div" >
      <div>
        <h4>{props.username}</h4>
        <span>{props.reply}</span>
      </div>
      <section style={{cursor:"pointer"}} onClick={()=>{setToggle(!toggle)}}>Reply</section> 
      {toggle ?<div style={{background:"none", marginRight:"0"}}>
      <ReplyModal placeHolder="Write a Reply..."/>
      </div> : null}
    </div>)
}