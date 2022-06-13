import "./freindSuggesstionSidebarMenu.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import FriendCardSmall from "../../FriendsCardSmall/FriendCardSmall";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FriendHomePage } from "../../../../../redux/freindSplice.js";
function FriendsuggesstionSidebarMenu({ setHome, setFriendSuggesstion }) {
  const dispatch = useDispatch();
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
        url: URL + "/api/get_all_user?page=1&limit=10",
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
      setAllUsers(data);
    } catch (error) {
      console.log("Error", error);
    }
  }

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
      <div style={{ marginTop: "10px" }}>
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
      </div>
    </div>
  );
}

export default FriendsuggesstionSidebarMenu;
