import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { People, House } from "react-bootstrap-icons";
import {useSelector} from 'react-redux'
import { Avatar } from "@mui/material";

export default function BasicMenu() {
  const {currentUser} = useSelector((state)=>state.currentUser)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {currentUser.token ? (
          <section className="profile-icon">
            {" "}
            <Avatar
              sx={{ width: 24, height: 24 }}
              src={require("../../images/red.jpg")}
            />{" "}
            <section>{currentUser?.user?.username}</section>
          </section>
        ) : null}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          {currentUser.token ? (
            <Link to={`/profile/${currentUser?.user.username}`} className="profile-icon">
              {" "}
              <Avatar
                sx={{ width: 24, height: 24 }}
                src={require("../../images/red.jpg")}
              />{" "}
              <section >Profile</section>
            </Link>
          ) : null}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={currentUser.token ? "/" : "/login"}>
            <House /> Home
          </Link>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          {" "}
          <Link to="/myfeed">
            <PersonFill /> My Posts
          </Link>
        </MenuItem> */}
        <MenuItem onClick={handleClose}>
          {" "}
          <Link to="/friendfeed">
            <People /> Friends Posts
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

{
  /* <div className="sidebar-div2">
{token ? (
  <section className="profile-icon">
    {" "}
    <Avatar sx={{ width: 24, height: 24 }}
      src={require("../../images/red.jpg")}
   
    />{" "}
    <section>{currentUser?.user?.username}</section>
  </section>
) : null}


  <Link to={token ? '/' : '/login'}><House/> Home</Link>   
  <Link to="/myfeed"><PersonFill/> My Posts</Link>
  <Link to="/friendfeed"><People/> Friends Posts</Link>
</div> */
}
