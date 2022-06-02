import React, { useEffect } from "react";
import { Card } from "@mui/material";
import content from "../../../../image/contact.png";
import Button from "@mui/material/Button";
import { useState, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./FriendCard.css";
import { margin } from "@mui/system";
import axios from "axios";

function Friendcard({ type, user, friendRequests }) {
  const CardType = type;
  const request_suggest = user;
  const URL = process.env.REACT_APP_API_URL;
  const ProfilePic = user?.profilePic ? URL + "/" + user.profilePic : "";
  const friend_requests = friendRequests;
  const TOKEN = localStorage.getItem("TOKEN");
  const removeUserRef = useRef(null);
  const [requestSended, setRequesSended] = useState(false);
  const [requestMessage, setRequesMessage] = useState("");
  const [cancleLoading, setCancleLoading] = useState(false);
  const [isAddFriendLoading, setIsAddfriendLoading] = useState(false);
  const [isConfirmedLoading, setIsConfirmedLoading] = useState(false);
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
    setIsAddfriendLoading(true);
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
      const data = await response.data;
      if (data == "sended") {
        setTimeout(() => {
          setIsAddfriendLoading(false);
          setRequesSended(true);
        }, 500);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function cancleFriendRequest() {
    setCancleLoading(true);
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
      setRequesSended(false);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  async function handleConfirm() {
    setIsConfirmedLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/confirm_friend_request?conform_id=" + user._id,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;

      if (data == "confirmed")
        setTimeout(() => {
          setIsConfirmedLoading(false);
        }, 1000);
      removeUserRef.current.remove();
    } catch (error) {
      console.log("Error", error);
    }
  }

  function handleDelete() {
    removeUserRef.current.remove();
    try {
    } catch (error) {}
  }

  function removeUser() {
    removeUserRef.current.remove();
  }

  return (
    <div ref={removeUserRef}>
      <Card className="FriendCard">
        <img src={ProfilePic ? ProfilePic : content} alt="profile image" />
        <div className="FriendCardInfo">
          <h4>{request_suggest.firstName + " " + request_suggest.lastName}</h4>
          <div style={{ height: "20px", margin: "5px 0 10px 0" }}>
            {requestMessage}
          </div>
          <div className="FriendCardButton">
            {CardType == "request" ? (
              <div className="FrendRequestButton">
                <Button
                  variant="contained"
                  onClick={() => {
                    handleConfirm();
                  }}
                >
                  {isConfirmedLoading ? (
                    <CircularProgress sx={{ color: "white" }} size="1.6rem" />
                  ) : (
                    "Confirm"
                  )}
                </Button>
                <div>
                  <Button
                    variant="contained"
                    sx={{ color: "black" }}
                    onClick={() => {
                      handleDelete();
                    }}
                  >
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
                        {cancleLoading ? (
                          <CircularProgress
                            sx={{ color: "white" }}
                            size="1.6rem"
                          />
                        ) : (
                          "cancle"
                        )}
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
                      {isAddFriendLoading ? (
                        <CircularProgress
                          sx={{ color: "white" }}
                          size="1.6rem"
                        />
                      ) : (
                        "Add Friend"
                      )}
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
