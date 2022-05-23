import React from "react";
import "../FriendReauestSidebarmenu/friendRequestSidebarmenu.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
function FriendRequestSidebarMenu({ setFriendRequest, setHome }) {
  return (
    <div className="FriendRequestSidebarMenu">
      <div className="FriendRequestSidebarMenuHead">
        <IconButton
          onClick={() => {
            setFriendRequest(false);
            setHome(true);
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <div>
          <p
            onClick={() => {
              setFriendRequest(false);
              setHome(true);
            }}
          >
            Friends
          </p>
          <h2>Friend requests</h2>
        </div>
      </div>
      <Divider variant="middle" />
    </div>
  );
}

export default FriendRequestSidebarMenu;
