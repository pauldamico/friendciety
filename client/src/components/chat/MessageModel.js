import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
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
};

const conversationStyle = {
  maxHeight:'20vh',
  overflow:'auto',
  display: "flex",
  flexDirection:" column-reverse"
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
const combinedMessageArray = messages.messages.sentMessages.filter(sentMessage=>sentMessage.to === props.user).map(message=><div key={message._id}><section>{message.from}<span>{message.message}</span></section></div>).concat(messages.messages.receivedMessages.filter(receivedMessage=>receivedMessage.from === props.user).map(message=><div key={message._id}><section>{message.from}<span>{message.message}</span></section></div>))
const listMessages =combinedMessageArray.sort((a,b)=>a.chatOrder - b.chatOrder)


  const onChange = (e)=>{
    setMessageContent(e.target.value)
  }

  

  return (
    <div>
      <Button onClick={handleOpen}>{props.user}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <section style={conversationStyle}>
            
      {listMessages}
          </section>
          <Divider sx={{marginTop:"1vh"}} />
          <form onSubmit={onSubmit}>
       
        <Typography id="modal-modal-title" variant="h6" component="h2">
          
           Send Message to {props.user}
          </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          
         <textarea required onChange={onChange} value={messageContent} style={{width:"100%"}} />
          </Typography>
          <button>Send</button>
          </form>
          </Box>
        </Box>
        
      </Modal>
    </div>
  );
}