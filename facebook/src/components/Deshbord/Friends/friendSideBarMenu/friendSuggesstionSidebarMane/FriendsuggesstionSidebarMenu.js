import "./freindSuggesstionSidebarMenu.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import FriendCardSmall from "../../FriendsCardSmall/FriendCardSmall";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FriendHomePage } from "../../../../../redux/freindSplice.js";
function FriendsuggesstionSidebarMenu({ setHome, setFriendSuggesstion }) {
  const dispatch = useDispatch();
  const [isLoadingAllUser, setIsLoadingAllUser] = useState(false);
  const [allUser, setAllUsers] = useState([]);
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchAllUser();
  }, []);

  async function fetchAllUser() {
    setIsLoadingAllUser(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_all_user",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
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
          return <FriendCardSmall key={i} type=" USGGESSION" user={e} />;
        })}
      </div>
    </div>
  );
}

export default FriendsuggesstionSidebarMenu;
