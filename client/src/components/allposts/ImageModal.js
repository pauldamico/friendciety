import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  display:'flex',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "45vw",
  height:"60vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
  '@media (max-width: 768px)': {
    width: '90vw',
    height: '40vh',
  }
};

export default function ImageModal(props) {

    const {open, handleClose, imgSrc} = props
 


  return (

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
        
          <img alt="" width="100%" src={imgSrc}/>
      
        </Box>
      </Modal>
  
  );
}