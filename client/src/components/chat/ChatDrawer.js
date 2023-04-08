import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import {useSelector} from 'react-redux'
import MessageModel from './MessageModel';
import { ApiCalls } from '../ApiCalls'; 
import ChatIcon from '@mui/icons-material/Chat';

export default function ChatDrawer() {
  const {getMessages} = ApiCalls()
  const {friends} = useSelector(state=>state.friends)
  const {messages} = useSelector(state=>state.messages)
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

// this lists the users who sent messages from newest to oldest
const uniqueMessages = [...new Map(messages.receivedMessages.slice().sort((a,b)=>b.chatOrder-a.chatOrder).map(message => [message.from, message])).values()].map(item=>item.from).reverse()
//this sorts all of your friends with users that sent the latest messages to you first
const friendsSortedByNewMessages = friends.friends.slice().sort((a, b) => b.user.localeCompare(a.user))
    .map(({ user }) => user)
    .sort((a, b) => {
      const indexA = uniqueMessages.indexOf(a);
      const indexB = uniqueMessages.indexOf(b);
      return indexA < indexB ? -1 : indexA > indexB ? 1 : 0;
    })
    .reverse();






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
      
        {uniqueMessages.map((friend) => (
          <ListItem key={friend} disablePadding>
              
            <ListItemButton sx={{height:"40px", padding:"0", marginBottom:"1vh"}}>              
            <MessageModel user={friend}/>
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
          <Button onClick={toggleDrawer(anchor, true)}><ChatIcon/></Button>
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