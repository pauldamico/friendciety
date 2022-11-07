import React, {useState} from "react"
import UpdatePostModel from "./UpdatePostModel"

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
        <div>
            <div onClick ={toggleMenuHandler}>
            <h1>{props.post}</h1>
            </div>
            { toggleMenu &&  <div>
            { toggleEdit && <UpdatePostModel post = {props.post} _id  ={props._id} updatePost={props.updatePost} toggleEditHandler={toggleEditHandler} toggleMenuHandler={toggleMenuHandler}/>}
           { !toggleEdit && <button onClick ={()=>{props.deletePost(props._id)}}>Delete</button>}
           { !toggleEdit && <button onClick ={toggleEditHandler}>edit</button>}
           </div>}
        </div>
    )
}