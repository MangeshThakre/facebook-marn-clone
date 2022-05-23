import React from "react";
import "./freindSuggesstionSidebarMenu.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

function FriendsuggesstionSidebarMenu({ setHome, setFriendSuggesstion }) {
  return (
    <div className="FriendsuggesstionSidebarMenu">
      <div className="FriendsuggesstionSidebarHead">
        <IconButton
          onClick={() => {
            setFriendSuggesstion(false);
            setHome(true);
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <div>
          <p
            onClick={() => {
              setFriendSuggesstion(false);
              setHome(true);
            }}
          >
            Friends
          </p>
          <h2>Suggestions</h2>
        </div>
      </div>
      <Divider variant="middle" />
    </div>
  );
}

export default FriendsuggesstionSidebarMenu;
