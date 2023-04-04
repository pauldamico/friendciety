import React, {useState, useEffect} from 'react';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useSelector, useDispatch} from 'react-redux'
import { messagesSlice } from '../../redux';
import Divider from '@mui/material/Divider';
import axios from 'axios';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding:"0",
  borderRadius:"10px"
};

const conversationStyle = {
  maxHeight:'20vh',
  overflow:'auto',
  display: "flex",
  flexDirection:" column-reverse",
  minHeight:"20vh",

}

const {setMessages} = messagesSlice.actions

export default function MessageModel(props) {
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state => state.currentUser)
  const {token} = currentUser || null
  const config = {headers:{Authorization: `Bearer ${token}`}}
  const {messages} = useSelector(state=>state)

  const [messageContent, setMessageContent] =useState("")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //send and receive message info from rest API
  const onSubmit = (e)=>{
    e.preventDefault()
   axios.put('/auth/messages/sendmessage',{message:messageContent, user:props.user}, config)
   .then(res=>{
  dispatch(setMessages(res.data))
  })
   .catch(err=>console.log(err))   
    setMessageContent("")
  }
const combinedMessageArray = messages.messages.sentMessages.filter(sentMessage=>sentMessage.to === props.user).concat(messages.messages.receivedMessages.filter(receivedMessage=>receivedMessage.from === props.user))
const sortedArray =combinedMessageArray.sort((a,b)=>b.chatOrder - a.chatOrder )

const listMessages =sortedArray.map(message=><Box sx={{display:"flex", flexDirection:"row", alignItems:"flex-end",  marginLeft:".5vw",   marginRight:"1vw"}} order={message.postorder} key={message._id}><div><Avatar sx={{ width: 20, height: 20 }}/></div><div style={{borderRadius:"10px", marginLeft:"8px", marginTop:"2px", backgroundColor:"lightGrey", padding:"5px"}}><section> {message.from.toUpperCase()}</section><section>{message.message}</section></div></Box>)


  const onChange = (e)=>{
    setMessageContent(e.target.value)
  }

  

  return (
    <div  style={{width:"100%", height:"100%"}}>
      
      <Button  sx={{width:"100%", height:"100%", padding:"0"}} onClick={handleOpen}><Avatar sx={{ marginLeft:"1vw"}} /><p style={{textAlign:"left", width:"100%", marginLeft:".5vw"}}> {props.user}</p></Button>
      <Modal       
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
        <div style={{height:"100%", paddingTop:"1vh",  marginLeft:".5vw", }} className='flexbox center row' ><Avatar  sx={{ width: 24, height: 24,}}/><p style={{marginLeft:"1vw"}}>{props.user}</p></div>
        <Divider sx={{marginTop:"1vh"}} />
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <section style={conversationStyle}>
           
      {listMessages}
   
          </section>
          <Divider sx={{marginTop:"1vh"}} />
          <form onSubmit={onSubmit}>
       
        <Typography id="modal-modal-title" variant="h6" component="h2">
          
        
          </Typography>
        <Typography style={{display:"flex", justifyContent:"center", alignItems:"center", height:"5vh"}} id="modal-modal-title" variant="h6" component="h2">
          
         <input required onChange={onChange} value={messageContent} style={{width:"80%", height:"2vh", borderRadius:"10px", padding:"5px"}} />
          </Typography>
         
          </form>
          </Box>
        </Box>
        
      </Modal>
    </div>
  );
}