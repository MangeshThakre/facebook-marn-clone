import React from "react";
import "../FriendReauestSidebarmenu/friendRequestSidebarmenu.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { useRef, useState, useEffect } from "react";
import FriendCardSmall from "../../FriendsCardSmall/FriendCardSmall";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FriendHomePage } from "../../../../../redux/freindSplice.js";
import FreindCardSmallSceleton from "../../FriendsCardSmall/freindCardSmallSceleton";
function FriendRequestSidebarMenu({ setFriendRequest }) {
  const dispatch = useDispatch();
  const requestListRef = useRef(null);
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);
  const ICONCOLOR = useSelector((state) => state.darkLight.iconColor);
  const [getFriendrequests, setGetFriendrequests] = useState([]);
  const [isgetFriendrequestsLoading, setIsGetFriendrequests] = useState(false);
  useEffect(() => {
    fetchFriendRequests();
  }, []);

  // fetch freind Requests
  async function fetchFriendRequests() {
    setIsGetFriendrequests(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_friend_requests_user?page=" + page + "&limit=10",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data.data;
      setGetFriendrequests([...getFriendrequests, ...data]);
      setIsGetFriendrequests(false);
      if (response.data.next) {
        setNextPage(true);
      } else setNextPage(false);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  useEffect(() => {
    requestListRef.current.addEventListener("scroll", () => {
      if (
        requestListRef.current.clientHeight +
          requestListRef.current.scrollTop >=
        requestListRef.current.scrollHeight
      ) {
        setPage(page + 1);
      }
    });
  });

  useEffect(() => {
    if (nextPage) fetchFriendRequests();
  }, [page]);

  return (
    <div className="FriendRequestSidebarMenu">
      <div className="FriendRequestSidebarMenuHead">
        <IconButton
          onClick={() => {
            setFriendRequest(false);
            dispatch(FriendHomePage(true));
          }}
        >
          <ArrowBackIcon sx={{ color: ICONCOLOR }} />
        </IconButton>
        <div>
          <p
            style={{ color: ICONCOLOR }}
            onClick={() => {
              setFriendRequest(false);
              dispatch(FriendHomePage(true));
            }}
          >
            Friends
          </p>
          <h2 style={{ color: FONTCOLOR }}>Friend requests</h2>
        </div>
      </div>
      <Divider variant="middle" />
      <div
        className="freindRequestList"
        style={{ marginTop: "10px", overflowY: "scroll", maxHeight: "80vh" }}
        ref={requestListRef}
      >
        {getFriendrequests.map((e, i) => {
          return <FriendCardSmall user={e} key={i} type={"FREINDRERQUEST"} />;
        })}
        {isgetFriendrequestsLoading ? (
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

export default FriendRequestSidebarMenu;
