import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authProvider";
import { PersonFill, People, House } from "react-bootstrap-icons";
import { Avatar } from "@mui/material";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { search, currentUser, getListOfAllUsers, token, logout, allUsers } =
    useContext(AuthContext);
const navigate = useNavigate()
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {token ? (
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
          {token ? (
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
          <Link to={token ? "/" : "/login"}>
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
