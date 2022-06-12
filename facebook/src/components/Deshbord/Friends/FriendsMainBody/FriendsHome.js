import React from "react";
import "./FriendsHome.css";
import Divider from "@mui/material/Divider";
import Friendcard from "../friendCard/Friendcard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import User from "../../../User.js/User";
import { useSelector } from "react-redux";
import freindHpmepageImg from "../../../../image/freindHpmepageImg.svg";
function FriendsHome() {
  const FREINDHOMEPAGE = useSelector((state) => state.freind.FriendHomePage);
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
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

  const { USERID } = useParams();

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
        url: URL + "/api/get_friend_requests_user",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
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

  function homePage() {
    if (USERID && USER.id != USERID) {
      return <User type={"users"} />;
    } else if (!FREINDHOMEPAGE && !USERID) {
      return (
        <div className="freindhomePageBlank">
          <img src={freindHpmepageImg} alt="freindHpmepageImg" />
          <h2 style={{ color: "#696b6f" }}>
            Select people's names to preview their profile.
          </h2>
        </div>
      );
    } else {
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
  }

  return homePage();
}

export default FriendsHome;
