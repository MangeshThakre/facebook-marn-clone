import "./freindSuggesstionSidebarMenu.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import FriendCardSmall from "../../FriendsCardSmall/FriendCardSmall";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import FreindCardSmallSceleton from "../../FriendsCardSmall/freindCardSmallSceleton.js";
import { FriendHomePage } from "../../../../../redux/freindSplice.js";
function FriendsuggesstionSidebarMenu({ setHome, setFriendSuggesstion }) {
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const dispatch = useDispatch();
  const suggestionListRef = useRef(null);
  const [isLoadingAllUser, setIsLoadingAllUser] = useState(false);
  const [allUser, setAllUsers] = useState([]);
  const [friend_requests, setFriend_requests] = useState([]);
  const SENT_FREINDREQUEST = useSelector(
    (state) => state.friend.send_freindRequest
  );

  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);
  const ICONCOLOR = useSelector((state) => state.darkLight.iconColor);
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchAllUser();
    fetchSendedFriendRequest();
  }, []);

  useEffect(() => {
    fetchSendedFriendRequest();
  }, [SENT_FREINDREQUEST]);

  // sent freind request
  async function fetchSendedFriendRequest() {
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/sended_friend_requests",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      setFriend_requests(data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  //fetch all user expect own, freind, and who send freind request
  async function fetchAllUser() {
    setIsLoadingAllUser(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_all_user?page=" + page + "&limit=10",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data.data;

      if (data.length == 0) {
        setIsLoadingAllUser(false);
      }
      setIsLoadingAllUser(false);
      setAllUsers([...allUser, ...data]);
      if (response.data.next) {
        setNextPage(true);
      } else setNextPage(false);
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    suggestionListRef.current.addEventListener("scroll", () => {
      if (
        suggestionListRef.current.clientHeight +
          suggestionListRef.current.scrollTop >=
        suggestionListRef.current.scrollHeight
      ) {
        setPage(page + 1);
      }
    });
  });

  useEffect(() => {
    if (nextPage) fetchAllUser();
  }, [page]);

  return (
    <div className="FriendsuggesstionSidebarMenu">
      <div className="FriendsuggesstionSidebarHead">
        <IconButton
          onClick={() => {
            setFriendSuggesstion(false);
            dispatch(FriendHomePage(true));
          }}
        >
          <ArrowBackIcon sx={{ color: ICONCOLOR }} />
        </IconButton>
        <div>
          <p
            style={{ color: ICONCOLOR }}
            onClick={() => {
              setFriendSuggesstion(false);
              dispatch(FriendHomePage(true));
            }}
          >
            Friends
          </p>
          <h2 style={{ color: FONTCOLOR }}>Suggestions</h2>
        </div>
      </div>
      <Divider variant="middle" />
      <div
        className="suggestionList"
        ref={suggestionListRef}
        style={{ marginTop: "10px", overflowY: "scroll", maxHeight: "80vh" }}
      >
        {allUser.map((e, i) => {
          return (
            <FriendCardSmall
              key={i}
              type="SUGGESTION"
              user={e}
              friend_requests={friend_requests}
            />
          );
        })}

        {isLoadingAllUser ? (
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

export default FriendsuggesstionSidebarMenu;
