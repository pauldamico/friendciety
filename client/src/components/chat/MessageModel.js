import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useSelector} from 'react-redux'
import Divider from '@mui/material/Divider';

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

export default function MessageModel(props) {
  const {currentUser} = useSelector(state=>state.currentUser)
  const [messageContent, setMessageContent] =useState("")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (e)=>{
    e.preventDefault()
    console.log(messageContent)
    setMessageContent("")
  }

  const onChange = (e)=>{
    setMessageContent(e.target.value)
  }
console.log(messageContent)
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
         
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div style={conversationStyle}>
              <p>
       This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still This needs to be setup still 
       </p>
          </div>
          <Divider sx={{marginTop:"1vh"}} />
          <form onSubmit={onSubmit}>
       
        <Typography id="modal-modal-title" variant="h6" component="h2">
          
           Send Message to {props.user}
          </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          
         <textarea onChange={onChange} value={messageContent} style={{width:"100%"}} />
          </Typography>
          <button>Send</button>
          </form>
          </Typography>
        </Box>
        
      </Modal>
    </div>
  );
}