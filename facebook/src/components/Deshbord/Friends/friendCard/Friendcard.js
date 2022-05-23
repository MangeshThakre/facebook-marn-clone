import React, { useEffect } from "react";
import { Card } from "@mui/material";
import content from "../../../../image/contact.png";
import Button from "@mui/material/Button";
import { useState, useRef } from "react";
import "./FriendCard.css";
import { margin } from "@mui/system";
import axios from "axios";

function Friendcard({ type, user, friendRequests }) {
  const CardType = type;
  const request_suggest = user;
  const friend_requests = friendRequests;
  const URL = process.env.REACT_APP_API_URL;
  const TOKEN = localStorage.getItem("TOKEN");
  const removeUserRef = useRef(null);
  const [requestSended, setRequesSended] = useState(false);
  const [requestMessage, setRequesMessage] = useState("");
  const [cancleLoading, setCancleLoading] = useState(false);
  useEffect(() => {
    if (type != "request")
      for (const friend_request_id of friend_requests) {
        if (friend_request_id.request_id === request_suggest._id) {
          setRequesSended(true);
          setRequesMessage("Request sent");
        }
      }
  });

  async function requestSend() {
    setRequesSended(true);
    setRequesMessage("Request sent");
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/friend_request?requested_id=" + request_suggest._id,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function cancleFriendRequest() {
    setCancleLoading(true);
    setRequesSended(false);
    setRequesMessage("Request canceled");
    try {
      const response = await axios({
        merhod: "delete",
        url:
          URL +
          "/api/cancle_friend_request?requested_id=" +
          request_suggest._id,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      setCancleLoading(false);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  function removeUser() {
    removeUserRef.current.remove();
  }

  return (
    <div ref={removeUserRef}>
      <Card className="FriendCard">
        <img src={content} alt="profile image" />
        <div className="FriendCardInfo">
          <h4>{request_suggest.firstName + " " + request_suggest.lastName}</h4>
          <div style={{ height: "20px", margin: "5px 0 10px 0" }}>
            {requestMessage}
          </div>
          <div className="FriendCardButton">
            {CardType == "request" ? (
              <div className="FrendRequestButton">
                <Button variant="contained">Confirm</Button>
                <div>
                  <Button variant="contained" sx={{ color: "black" }}>
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div className="FriendSuggestButton">
                {requestSended ? (
                  <>
                    <div style={{ height: "42px" }}></div>
                    <div>
                      <Button
                        variant="contained"
                        onClick={() => {
                          cancleFriendRequest();
                        }}
                        sx={{ color: "black" }}
                      >
                        {cancleLoading ? "Loading...." : "cancle"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => {
                        requestSend();
                      }}
                    >
                      Add Friend
                    </Button>
                    <div>
                      <Button
                        variant="contained"
                        onClick={() => {
                          removeUser();
                        }}
                        sx={{ color: "black" }}
                      >
                        Remove
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Friendcard;
