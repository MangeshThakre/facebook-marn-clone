import React, { useEffect, useState } from "react";
import "./AllFriendSideBarmenu.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import FriendCardSmall from "../../FriendsCardSmall/FriendCardSmall";
import { useDispatch } from "react-redux";
import { FriendHomePage } from "../../../../../redux/freindSplice.js";
import axios from "axios";
function AllFriendSideBarMenu({ setAllFriends }) {
  const dispatch = useDispatch();
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const [Friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFreind();
  }, []);

  async function fetchFreind() {
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_friends?user_id=" + USER.id + "&page=1&limit=10",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data.data;
      setFriends(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="AllFriendSideBarMenu">
      <div className="AllFriendSideBarMenuHead">
        <IconButton
          onClick={() => {
            setAllFriends(false);
            dispatch(FriendHomePage(true));
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <div>
          <p
            onClick={() => {
              setAllFriends(false);
              dispatch(FriendHomePage(true));
            }}
          >
            Friends
          </p>
          <h2>All friends</h2>
        </div>
      </div>
      <Divider variant="middle" />

      <div style={{ marginTop: "20px" }}>
        {Friends.map((freind, i) => {
          return <FriendCardSmall key={i} user={freind} type={"FREIND"} />;
        })}
      </div>
    </div>
  );
}

export default AllFriendSideBarMenu;
