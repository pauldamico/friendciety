import React, {useState} from "react"
import UpdatePostModel from "../UpdatePostModel"

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
            { !toggleEdit && <section onClick ={toggleMenuHandler}>...</section> }
            { !toggleEdit &&<h5>{props._id}</h5>}
            { !toggleEdit &&<h1>{props.post}</h1>}
            { toggleEdit && <div className="myfeed-input"><UpdatePostModel post = {props.post} _id  ={props._id} updatePost={props.updatePost} toggleEditHandler={toggleEditHandler} toggleMenuHandler={toggleMenuHandler}/></div>}
            { toggleMenu &&  <div className="myfeed-post-edit-del-div">
           
                        
            { !toggleEdit && <button onClick ={()=>{props.deletePost(props._id)}}>Delete</button>}
            { !toggleEdit && <button onClick ={toggleEditHandler}>edit</button>}
            </div>}
            </div>
           
        </div>
    )
}