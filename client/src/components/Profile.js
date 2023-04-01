import React, {useContext} from "react"
import {useSelector} from 'react-redux'
import {PostContext} from "../context/postProvider"
import Feed from "./Feed"
import {useParams} from "react-router-dom"
import { FriendContext } from "../context/friendProvider"


export default function Profile (){
    const{currentUser} = useSelector(state=>state.currentUser)
    const{friends} = useContext(FriendContext)
    const {myFeed} = useContext(PostContext)
    const navigatedUser = useParams().userprofile

    
//maps combines all friends and username into one array
const profile = [...friends.friends.map(friend=>friend.user), currentUser?.user.username]
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
        <Feed user={selectedUser} feed={userPosts}/>
        </div>
    </div>)
}