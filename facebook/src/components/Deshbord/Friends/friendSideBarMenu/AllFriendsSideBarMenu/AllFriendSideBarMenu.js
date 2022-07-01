import React, { useRef, useEffect, useState } from "react";
import "./AllFriendSideBarmenu.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import FriendCardSmall from "../../FriendsCardSmall/FriendCardSmall";
import { useDispatch, useSelector } from "react-redux";
import { FriendHomePage } from "../../../../../redux/freindSplice.js";
import FreindCardSmallSceleton from "../../FriendsCardSmall/freindCardSmallSceleton";
import axios from "axios";
function AllFriendSideBarMenu({ setAllFriends }) {
  const dispatch = useDispatch();
  const allFreindListRef = useRef(null);
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const [Friends, setFriends] = useState([]);
  const [isFriendsLoading, setIsFriendsLoading] = useState(false);
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);
  const ICONCOLOR = useSelector((state) => state.darkLight.iconColor);

  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);

  useEffect(() => {
    fetchFreind();
  }, []);

  async function fetchFreind() {
    setIsFriendsLoading(true);
    try {
      const response = await axios({
        method: "get",
        url:
          URL +
          "/api/get_friends?user_id=" +
          USER.id +
          "&page=" +
          page +
          "&limit=10&match=",

        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data.data;
      setFriends(data);
      if (response.data.next) {
        setNextPage(true);
      } else setNextPage(false);
      setIsFriendsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    allFreindListRef.current.addEventListener("scroll", () => {
      if (
        allFreindListRef.current.clientHeight +
          allFreindListRef.current.scrollTop >=
        allFreindListRef.current.scrollHeight
      ) {
        setPage(page + 1);
      }
    });
  });

  useEffect(() => {
    if (nextPage) fetchFreind();
  }, [page]);

  return (
    <div className="AllFriendSideBarMenu">
      <div className="AllFriendSideBarMenuHead">
        <IconButton
          onClick={() => {
            setAllFriends(false);
            dispatch(FriendHomePage(true));
          }}
        >
          <ArrowBackIcon sx={{ color: ICONCOLOR }} />
        </IconButton>
        <div>
          <p
            style={{ color: ICONCOLOR }}
            onClick={() => {
              setAllFriends(false);
              dispatch(FriendHomePage(true));
            }}
          >
            Friends
          </p>
          <h2 style={{ color: FONTCOLOR }}>All friends</h2>
        </div>
      </div>
      <Divider variant="middle" />

      <div
        className="allfreindlist"
        style={{ marginTop: "10px", overflowY: "scroll", maxHeight: "80vh" }}
        ref={allFreindListRef}
      >
        {Friends.map((freind, i) => {
          return <FriendCardSmall key={i} user={freind} type={"FREIND"} />;
        })}

        {isFriendsLoading ? (
          <>
            <FreindCardSmallSceleton />
            <FreindCardSmallSceleton />
            <FreindCardSmallSceleton />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default AllFriendSideBarMenu;
