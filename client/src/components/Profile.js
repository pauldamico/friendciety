import React, {useContext} from "react"
import { AuthContext } from "../context/authProvider"
import {MyFeedContext} from "../context/myFeedProvider"
import Feed from "./Feed"
import {useParams} from "react-router-dom"


export default function Profile (){
    const{currentUser} = useContext(AuthContext)
    const {myFeed} = useContext(MyFeedContext)
    const navigatedUser = useParams().userprofile
   
    
//maps combines all friends and username into one array
const profile = [...currentUser?.user.friends.map(friend=>friend.user), currentUser?.user.username]
//shows posts according to the endpoint
const userPosts = myFeed?.filter(post=>post.username === navigatedUser) || []
//shows the username according to the endpoint
const selectedUser = profile.find(user=>user === navigatedUser) || null


    return (<div className="flexbox" >
       
        {selectedUser ?<div className="profile-div flexbox center">
         <h1>Username: {selectedUser}</h1>
            <img alt="" width="100px" height="100px" />
           {currentUser.user.username !== navigatedUser ? <h3>Remove Friend</h3> : null}
            </div> :<div className="profile-div flexbox center">User must be a friend to view this page</div>}
            <div>
        <Feed feed={userPosts}/>
        </div>
    </div>)
}