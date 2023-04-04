import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Avatar } from '@mui/material/';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useSelector} from 'react-redux'
import MessageModel from './MessageModel';
import { ApiCalls } from '../ApiCalls'; 

export default function ChatDrawer() {
  const {getMessages} = ApiCalls()
  const {friends} = useSelector(state=>state.friends)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    messageModal:false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const toggleMessage = () => () => {
    setState({ ...state, messageModal:!state.messageModal });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <h3 style ={{textAlign:"center"}}>Messages</h3>
      <List >
      <Divider sx={{marginBottom:"1vh"}}/>
      
        {friends.friends.map((friend) => (
          <ListItem key={friend.user} disablePadding>
              
            <ListItemButton sx={{height:"40px", padding:"0", marginBottom:"1vh"}}>              
            <MessageModel user={friend.user}/>
              {/* <ListItemText onClick={toggleMessage} primary={friend.user} /> */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>    

    </Box>
  );

  useEffect(()=>{
    getMessages()
  }, [])

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Chat</Button>
          <Drawer
          
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >         
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}


    </div>
  );
}