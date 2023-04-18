import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SelectedUser from './SelectedUser';

const style = {
  position: 'absolute',
  top: '15%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,

  '@media (max-width: 600px)': {
    width: 200,
  }

};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function AllUsers(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => { 
    setOpen(false);
  };

  const listUsers = props.filterBySearch.map(user=><SelectedUser key={user} resetSearch={props.resetSearch} handleClose={handleClose} user={user.split("@")[0]} />)

  return (
    <div>
      <Button onClick={handleOpen}>  <Diversity3Icon/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
        <input style={{borderRadius:"10px", gridColumn:"1/2", width:"100%", marginBottom:"5px"}} onChange ={props.searchUsersHandler} onClick={props.toggleSearch}  placeholder='Search Users...'/>
            {listUsers}
        
          {/* <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p> */}
          {/* <ChildModal /> */}
        </Box>
      </Modal>
    </div>
  );
}