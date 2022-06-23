import React from "react";
import "./friendcardSmall.css";
import { useNavigate } from "react-router-dom";
import contact from "../../../../image/contact.png";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  send_freindRequest,
  confirm_freindRequest,
  Reject_freindRequest,
} from "../../../../redux/freindSplice.js";

function FriendCardSmall({ user, type, friend_requests }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const URL = process.env.REACT_APP_API_URL;
  const TOKEN = localStorage.getItem("TOKEN");
  const removeFriendCardSmall = useRef(null);

  const request_suggest = user;
  const userName = user.userName;

  const [requestMessage, setRequesMessage] = useState("");
  const [requestSended, setRequesSended] = useState(false);
  const [cancleLoading, setCancleLoading] = useState(false);
  const [isAddFriendLoading, setIsAddfriendLoading] = useState(false);
  const [isConfirmedLoading, setIsConfirmedLoading] = useState(false);
  const [IsrejectLoading, setIsrejectLoading] = useState(false);

  // dark mode
  const ISDARK = useSelector((state) => state.darkLight.isDarkMode);
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);
  //
  const SENT_FREINDREQUEST = useSelector(
    (state) => state.friend.send_freindRequest
  );

  const CONFORM_FREINDREQUEST = useSelector(
    (state) => state.friend.confirm_freindRequest
  );

  const prifilePic = user.profilePic ? URL + "/" + user.profilePic : contact;

  //Toggle freind suggestion action button   bu user.js
  useEffect(() => {
    if (type == "SUGGESTION") {
      const is_freindRequestSent = friend_requests.some(
        ({ request_id: id }) => id == request_suggest._id
      );

      if (is_freindRequestSent) {
        setRequesSended(true);
        setRequesMessage("Request sent");
      } else setRequesSended(false);
    }
  }, [friend_requests]);

  /// hide freind request  after confirming by user.js
  useEffect(() => {
    if (CONFORM_FREINDREQUEST == user._id)
      removeFriendCardSmall.current.remove();
  }, [CONFORM_FREINDREQUEST]);

  /// send freind request
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
          dispatch(send_freindRequest(!SENT_FREINDREQUEST));
        }, 500);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  //cancle freind request
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
        setCancleLoading(false);
        setRequesSended(false);
        dispatch(send_freindRequest(!SENT_FREINDREQUEST));
      }, 500);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  //Conform Friend request
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
          dispatch(confirm_freindRequest(user._id));
        }, 500);
      removeFriendCardSmall.current.remove();
    } catch (error) {
      console.log("Error", error);
    }
  }

  // reject freind request \
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
          removeFriendCardSmall.current.remove();
          dispatch(Reject_freindRequest(user._id));
        }, 500);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  const Suggestions = (
    <div
      className={
        ISDARK == "on" ? "FriendCardSmall" + ISDARK : "FriendCardSmall"
      }
      ref={removeFriendCardSmall}
    >
      <div className="card">
        <div>
          <img
            className="FriendCardSmallImage"
            src={prifilePic}
            alt="image"
            onClick={() => navigate("/friends/" + user._id)}
          />
        </div>
        <div className="FriendCardSmalright">
          <b>
            <p style={{ color: FONTCOLOR }}>{userName}</p>
          </b>
          {requestSended ? (
            <div>
              <div style={{ width: "120px" }}> {requestMessage}</div>
              <div className="FriendCardSmalrightRemove">
                <Button
                  variant="contained"
                  onClick={() => {
                    cancleFriendRequest();
                  }}
                  sx={{ color: "black" }}
                >
                  {cancleLoading ? (
                    <CircularProgress sx={{ color: "#1976d2" }} size="1.6rem" />
                  ) : (
                    "Cancle"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  requestSend();
                }}
              >
                {isAddFriendLoading ? (
                  <CircularProgress sx={{ color: "white" }} size="1.6rem" />
                ) : (
                  "Add friend"
                )}
              </Button>
              <div className="FriendCardSmalrightRemove">
                <Button
                  variant="contained"
                  sx={{ color: "black" }}
                  onClick={() => {
                    removeFriendCardSmall.current.remove();
                    navigate("/friends");
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const freindRequest = (
    <div
      className={
        ISDARK == "on" ? "FriendCardSmall" + ISDARK : "FriendCardSmall"
      }
      ref={removeFriendCardSmall}
    >
      <div className="card">
        <div>
          <img
            className="FriendCardSmallImage"
            src={prifilePic}
            alt="image"
            onClick={() => navigate("/friends/" + user._id)}
          />
        </div>
        <div className="FriendCardSmalright">
          <b>
            <p style={{ color: FONTCOLOR }}>{userName}</p>
          </b>
          <div>
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
            <div className="FriendCardSmalrightRemove">
              <Button
                variant="contained"
                sx={{ color: "black" }}
                onClick={() => {
                  handleRejectFreindRequest();
                }}
              >
                {IsrejectLoading ? (
                  <CircularProgress sx={{ color: "#1976d2" }} size="1.6rem" />
                ) : (
                  "Reject"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {type != "FREIND" ? (
        <>{type == "SUGGESTION" ? Suggestions : freindRequest}</>
      ) : (
        <>
          <div
            className={
              ISDARK == "on" ? "FriendCardSmall" + ISDARK : "FriendCardSmall"
            }
            ref={removeFriendCardSmall}
          >
            <div
              className="card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/friends/" + user._id)}
            >
              <div>
                <img
                  className="FriendCardSmallImage"
                  src={prifilePic}
                  alt="image"
                />
              </div>
              <div className="FriendCardSmalright"></div>
              <b>
                <p style={{ color: FONTCOLOR }}>{userName}</p>
              </b>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FriendCardSmall;
