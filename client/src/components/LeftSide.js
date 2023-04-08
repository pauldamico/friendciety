import { Link } from "react-router-dom";
import {People, House} from 'react-bootstrap-icons'
import {Avatar} from '@mui/material'
import WindowSize from "./WindowSize";
import { useSelector } from "react-redux";


export default function LeftSide() {
  const { currentUser} = useSelector(state=>state.currentUser)
  const {token} = currentUser || null
   return (<WindowSize arrow=">">
    <div className="leftbar-div">
      {token ? (
        <div>   
          <div className="leftbar-div2">      

      
             
            {token ? (
            <Link to={`/profile/${currentUser?.user.username}`} className="profile-icon">
              {" "}
              <Avatar
                sx={{ width: 24, height: 24 }}
                src={require("../images/red.jpg")}
              />{" "}
              <section >{currentUser?.user.username}</section>
            </Link>            
          ) : null}
           <Link to={token ? '/' : '/login'}><House/> Home</Link> 
            <Link to="/friendfeed"><People/> Friends Posts</Link>
          </div>
        </div>
      ) : null}
    </div>
    </WindowSize>
  );
}
