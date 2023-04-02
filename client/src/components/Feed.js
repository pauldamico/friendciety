import React,{useState, useEffect, useContext} from "react"
import axios from "axios"
import Post from "./allposts/Post"
import ImageModal from "./allposts/ImageModal"
import { PostContext } from "../context/postProvider"
import {useDispatch, useSelector} from 'react-redux'
import { postsSlice, commentsSlice, repliesSlice, friendsSlice } from "../redux"

const {setPosts, addPost} = postsSlice.actions
const {setComments} = commentsSlice.actions
const {setReplies} = repliesSlice.actions
const {setFriends} = friendsSlice.actions

export default function Feed (props){
  const dispatch = useDispatch()


const {currentUser} = useSelector((state)=>state.currentUser)
const {token} = currentUser || null
const config = {headers:{Authorization: `Bearer ${token}`}}
const [imageInfo, setImageInfo] = useState({ post: "",image:null }); 
const [toggleAddImage,setToggleAddImage] = useState(false)
 const {deletePost, updatePost} = useContext(PostContext)

    const [addToFeed, setAddToFeed] = useState({ post: "" }); 
    //this will show friends and current user posts
    const posts = props.feed?.map(item=><Post key={item._id} deletePost={deletePost} updatePost={updatePost} {...item}/>)

    const getPosts = () =>{
      token && axios.get(`/auth/post/currentUserPosts`, config)    
      .then((res) => dispatch(setPosts(res.data)))
      .catch(err=>console.log(err));   
    }

    const getComments = ()=>{
      axios.get('/auth/comment', config)
      .then(res=>{dispatch(setComments(res.data))})
      .catch(err=>console.log(err))
    }
    // get all replies 
    const getReplies = ()=>{
      axios.get('/auth/reply', config)
      .then(res=>{dispatch(setReplies(res.data))})
      .catch(err=>console.log(err))
    }

    //get all friends
    function getFriendData (){   
      axios.get('/auth/friends/friends', config)    
      .then(res=>{
        dispatch(setFriends(res.data))   
      })}

      function toggleImage (){
        setToggleAddImage(!toggleAddImage)       
      }
      const addToMyFeed = (event) => {
        event.preventDefault()    
        axios.post(`/auth/post/addPost`, addToFeed, config)    
          .then((res) => dispatch(addPost(res.data)))
          .catch(err=>console.log(err));
          setAddToFeed({ post: "" })          
      };

      const addPostChangeHandler = (event) => {    
        const { name, value } = event.target;    
        setAddToFeed((prev) => ({ ...prev, [name]: value }));
      };
 
    
    useEffect(()=>{
      getPosts()
      getComments()
      getReplies()
      getFriendData()
    }, [])
    return (              
              <div className="my-feed-div">             
               {props.user === currentUser.user.username ? <div className="update-status-div" >
               <form className="update-status-form" onSubmit={addToMyFeed}>
                <input className="update-status-input"
                  name="post"
                  placeholder="Update Status"
                  value={addToFeed.post}
                  type="text"
                  onChange={addPostChangeHandler}
                />
                   </form>
              <div className="image-video-div"> 
                <section onClick={toggleImage} style={{display:'flex'}}><img  height='15px' width='15px' src={require('../images/picture.png')}/>Image</section>
               {toggleAddImage? <ImageModal toggleImage={toggleImage} toggleAddImage={toggleAddImage}/> : null}
                <section style={{display:'flex'}}><img  height='15px' width='15px' src={require('../images/picture.png')}/>Video</section>
              </div>  
              </div> : <div className="my-feed-div"></div>}
           <div>{posts.reverse()}           
           </div>          
            </div>                
            )}
