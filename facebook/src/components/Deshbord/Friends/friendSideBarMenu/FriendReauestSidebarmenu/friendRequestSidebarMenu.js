import React from "react";
import "../FriendReauestSidebarmenu/friendRequestSidebarmenu.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import FriendCardSmall from "../../FriendsCardSmall/FriendCardSmall";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FriendHomePage } from "../../../../../redux/freindSplice.js";
function FriendRequestSidebarMenu({ setFriendRequest }) {
  const dispatch = useDispatch();
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;

  const [getFriendrequests, setGetFriendrequests] = useState([]);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  async function fetchFriendRequests() {
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_friend_requests_user?page=1&limit=10",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data.data;
      setGetFriendrequests(data);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  return (
    <div className="FriendRequestSidebarMenu">
      <div className="FriendRequestSidebarMenuHead">
        <IconButton
          onClick={() => {
            setFriendRequest(false);
            dispatch(FriendHomePage(true));
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <div>
          <p
            onClick={() => {
              setFriendRequest(false);
              dispatch(FriendHomePage(true));
            }}
          >
            Friends
          </p>
          <h2>Friend requests</h2>
        </div>
      </div>
      <Divider variant="middle" />
      <div style={{ marginTop: "10px" }}>
        {getFriendrequests.map((e, i) => {
          return <FriendCardSmall user={e} key={i} type={"FREINDRERQUEST"} />;
        })}
      </div>
    </div>
  );
}

export default FriendRequestSidebarMenu;
