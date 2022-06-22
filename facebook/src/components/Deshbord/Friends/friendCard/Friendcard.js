import React, { useEffect } from "react";
import { Card } from "@mui/material";
import content from "../../../../image/contact.png";
import Button from "@mui/material/Button";
import { useState, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./FriendCard.css";
import { margin } from "@mui/system";
import axios from "axios";
import { useSelector } from "react-redux";
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
  const [IsrejectLoading, setIsrejectLoading] = useState(false);
  const CONFORM_FREINDREQUEST = useSelector(
    (state) => state.friend.confirm_freindRequest
  );
  const REJECT_FRIENDREQUEST = useSelector(
    (state) => state.friend.usReject_freindRequest
  );

  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);

  //Toggle freind suggestion action button   bu user.js
  useEffect(() => {
    if (type != "request") {
      const is_freindRequestSent = friend_requests.some(
        ({ request_id: id }) => id == request_suggest._id
      );

      if (is_freindRequestSent) {
        setRequesSended(true);
        setRequesMessage("Request sent");
      } else {
        setRequesSended(false);
      }
    }
  }, [friend_requests]);

  /// hide freind request  after confirming by user.js
  useEffect(() => {
    if (REJECT_FRIENDREQUEST == user._id) removeUserRef.current.remove();
  }, [REJECT_FRIENDREQUEST]);

  /// remove friend request if rejected
  useEffect(() => {
    if (CONFORM_FREINDREQUEST == user._id) removeUserRef.current.remove();
  }, [CONFORM_FREINDREQUEST]);

  //send freind request
  async function requestSend() {
    setIsAddfriendLoading(true);
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
          setRequesMessage("Request sent");
          setIsAddfriendLoading(false);
          setRequesSended(true);
        }, 500);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  // Cancle freind request
  async function cancleFriendRequest() {
    setCancleLoading(true);
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

      setTimeout(() => {
        setRequesMessage("Request canceled");

        setCancleLoading(false);
        setRequesSended(false);
      }, 500);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  //Conform friend request
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
        }, 500);
      removeUserRef.current.remove();
    } catch (error) {
      console.log("Error", error);
    }
  }

  /// reject freind request
  async function handleRejectFreindRequest() {
    setIsrejectLoading(true);

    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/reject_friend_request?rejectUser_id=" + user._id,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const data = await response.data;
      if (data == "rejected") {
        setTimeout(() => {
          setIsrejectLoading(false);
          removeUserRef.current.remove();
        }, 500);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  function removeUser() {
    removeUserRef.current.remove();
  }

  return (
    <div ref={removeUserRef}>
      <Card
        className="FriendCard"
        sx={{ backgroundColor: SUB_BACKGROUND_COLOR }}
      >
        <img src={ProfilePic ? ProfilePic : content} alt="profile image" />
        <div className="FriendCardInfo">
          <h4 style={{ color: FONTCOLOR }}>{request_suggest.userName}</h4>
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
                      handleRejectFreindRequest();
                    }}
                  >
                    {IsrejectLoading ? (
                      <CircularProgress
                        sx={{ color: "#1976d2" }}
                        size="1.6rem"
                      />
                    ) : (
                      "Reject"
                    )}
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
                            sx={{ color: "#1976d2" }}
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
