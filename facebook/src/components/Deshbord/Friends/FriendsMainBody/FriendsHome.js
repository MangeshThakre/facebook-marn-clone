import React from "react";
import "./FriendsHome.css";
import Divider from "@mui/material/Divider";
import Friendcard from "../friendCard/Friendcard";
import axios from "axios";
import { useEffect, useState } from "react";

function FriendsHome() {
  const URL = process.env.REACT_APP_API_URL;
  const TOKEN = localStorage.getItem("TOKEN");
  const [allUsers, setAllUsers] = useState([]);
  const [friend_requests, setFriend_requests] = useState([]);

  useEffect(() => {
    fetchAllUser();
    fetchSendedFriendRequest();
  }, []);

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
      console.log(data);
      setFriend_requests(data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function fetchAllUser() {
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
      setAllUsers(data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div className="friendsHome">
      <div className="friendsHome_friendRequest">
        <div className="friendsHome_friendRequest_head">
          <h3>Friend Requests</h3>
          <p>See All</p>
        </div>
        <div className="FriendcardDiv">
          {/* <Friendcard type={"request"} />
          <Friendcard type={"request"} /> */}
        </div>
      </div>
      <Divider />
      <div className="friendsHome_friendRequest">
        <div className="friendsHome_friendRequest_head">
          <h3>People You May Know</h3>
          <p>See All</p>
        </div>
        <div className="FriendcardDiv">
          {allUsers.map((e) => {
            return (
              <Friendcard
                type={"suggest"}
                friendRequests={friend_requests}
                user={e}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FriendsHome;
