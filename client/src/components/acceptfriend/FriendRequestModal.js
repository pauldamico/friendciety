import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Badge, Divider } from "@mui/material";
import FriendRequest from "./FriendRequest";
import {Avatar} from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:"50%",
  maxWidth: 400,
  minWidth:240,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

  
};


export default function FriendRequestModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const friendRequests = props.friends?.friendRequest?.map((item) => (
    <FriendRequest key={item}  user={item} />
  ));


  return (
    <div>
      <Button onClick={handleOpen}>        <Badge badgeContent={props.friends?.friendRequest.length} color="primary">
              <img
                height="20px"
                width="20px"
                src={require("../../images/addFriend.png")}
              />
            </Badge>{" "}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           New Requests
          </Typography>
          <Divider/>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
          {friendRequests}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}