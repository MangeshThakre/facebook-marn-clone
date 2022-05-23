import React from "react";
import "./AllFriendSideBarmenu.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

function AllFriendSideBarMenu({ setHome, setAllFriends }) {
  return (
    <div className="AllFriendSideBarMenu">
      <div className="AllFriendSideBarMenuHead">
        <IconButton
          onClick={() => {
            setAllFriends(false);
            setHome(true);
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <div>
          <p
            onClick={() => {
              setAllFriends(false);
              setHome(true);
            }}
          >
            Friends
          </p>
          <h2>All friends</h2>
        </div>
      </div>
      <Divider variant="middle" />
    </div>
  );
}

export default AllFriendSideBarMenu;
