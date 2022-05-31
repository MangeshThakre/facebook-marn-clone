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
  const [isLoadingAllUser, setIsLoadingAllUser] = useState(false);
  const [friend_requests, setFriend_requests] = useState([]);
  const [getFriendRequest, setGetFriendrequests] = useState([]);
  useEffect(() => {
    fetchAllUser();
    fetchSendedFriendRequest();
    fetchFriendRequests();
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
      setFriend_requests(data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function fetchFriendRequests() {
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_friend_requests",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      // console.log(data);
      setGetFriendrequests(data);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

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

  // console.log(isLoadingAllUser);

  return (
    <div className="friendsHome">
      {getFriendRequest.length != 0 ? (
        <>
          <div className="friendsHome_friendRequest">
            <div className="friendsHome_friendRequest_head">
              <h3>Friend Requests</h3>
              <p>See All</p>
            </div>
            <div className="FriendcardDiv">
              {getFriendRequest.map((e) => {
                return <Friendcard key={e._id} type={"request"} user={e} />;
              })}
            </div>
          </div>
          <Divider />
        </>
      ) : null}
      <div className="friendsHome_friendRequest">
        <div className="friendsHome_friendRequest_head">
          <h3>People You May Know</h3>
          <p>See All</p>
        </div>
        <div className="FriendcardDiv">
          {isLoadingAllUser
            ? "loading"
            : allUsers.map((e) => {
                return (
                  <Friendcard
                    key={e._id}
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
