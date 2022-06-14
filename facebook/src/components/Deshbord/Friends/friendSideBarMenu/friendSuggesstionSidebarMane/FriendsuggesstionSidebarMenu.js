import "./freindSuggesstionSidebarMenu.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import FriendCardSmall from "../../FriendsCardSmall/FriendCardSmall";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FriendHomePage } from "../../../../../redux/freindSplice.js";
import Skeleton from "@mui/material/Skeleton";
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
          <ArrowBackIcon />
        </IconButton>
        <div>
          <p
            onClick={() => {
              setFriendSuggesstion(false);
              dispatch(FriendHomePage(true));
            }}
          >
            Friends
          </p>
          <h2>Suggestions</h2>
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
          <div style={{ display: "flex" }}>
            <Skeleton
              variant="circular"
              width={60}
              height={60}
              sx={{ bgcolor: "grey.200", marginLeft: "12px" }}
            />
            <div>
              <Skeleton
                variant="rectangular"
                width={100}
                height={10}
                sx={{ bgcolor: "grey.200", margin: " 12px 0 0 12px " }}
              />
              <Skeleton
                variant="rectangular"
                width={200}
                height={20}
                sx={{ bgcolor: "grey.200", margin: " 5px 0 0 12px " }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default FriendsuggesstionSidebarMenu;
