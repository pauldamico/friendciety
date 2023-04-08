import { Link } from "react-router-dom";
import {People, House} from 'react-bootstrap-icons'
import {Avatar} from '@mui/material'
import WindowSize from "./WindowSize";
import { useSelector } from "react-redux";
import MessageModel from './chat/MessageModel';


export default function RightSide() {
  const { friends} = useSelector(state=>state.friends)
  const { messages} = useSelector(state=>state.messages)
  const { currentUser} = useSelector(state=>state.currentUser)

  const {token} = currentUser || null

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

   return (<WindowSize arrow=">">
    <div className="rightbar-div">
      {token ? (
        <div>   
          <div className="rightbar-div2">      
{friends.friends.slice().sort((a, b) => a.user.localeCompare(b.user)).map(friend=><MessageModel user={friend.user} key={friend.user} style={{display:"flex", gap:"1vw", alignItems:"center"}}/>)}
      
             
 
           
          </div>
        </div>
      ) : null}
    </div>
    </WindowSize>
  );
}
