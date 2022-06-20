import React from "react";
import "./friendUserBox.css";
import { Card, CardContent } from "@mui/material";
import { Button } from "@mui/material";
import contact from "../../../image/contact.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  send_freindRequest,
  confirm_freindRequest,
} from "../../../redux/freindSplice.js";
import { useDispatch, useSelector } from "react-redux";
function FreindUserBox({ e }) {
  const dispatch = useDispatch();
  const { USERID } = useParams();
  const URL = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const TOKEN = localStorage.getItem("TOKEN");
  const [showButton, setShowButton] = useState("addFriend");
  const [cancleLoading, setCancleLoading] = useState(false);
  const [isAddFriendLoading, setIsAddfriendLoading] = useState(false);
  const [isConfirmedLoading, setIsConfirmedLoading] = useState(false);
  const [is_freind, setIs_freind] = useState(false);
  const SENT_FREINDREQUEST = useSelector(
    (state) => state.friend.send_freindRequest
  );
  const CONFIRM_FREINDREQUEST = useSelector(
    (state) => state.friend.confirm_freindRequest
  );
  const REJECT_FRIENDREQUEST = useSelector(
    (state) => state.friend.Reject_freindRequest
  );

  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );

  const BACKGROUND_COLOR_SUB = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );

  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);

  useEffect(() => {
    fetchCommonFreind();
  }, []);

  useEffect(() => {
    fetchFriendRequests();
  }, [SENT_FREINDREQUEST, REJECT_FRIENDREQUEST]);

  async function fetchFriendRequests() {
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_friend_requests?request_id=" + e._id,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      if (data.sededRequest) setShowButton("FreindRequestCancle");
      if (data.getRequest) setShowButton("FreindRequestAccept");
      if (!data.sededRequest) setShowButton("addFriend");
      if (!data.sededRequest && !data.getRequest) setShowButton("addFriend");
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  async function fetchCommonFreind() {
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/is_friend?friend_id=" + e._id,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;

      if (data == "notFreind") {
        fetchFriendRequests();
      } else {
        setIs_freind(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // handle Confirm request
  async function handleConfirm() {
    setIsConfirmedLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/confirm_friend_request?conform_id=" + e._id,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;

      if (data == "confirmed")
        setTimeout(() => {
          setIsConfirmedLoading(false);
          setShowButton("none");
          dispatch(confirm_freindRequest(USERID));
        }, 500);
    } catch (error) {
      console.log("Error", error);
    }
  }

  // handle send request
  async function requestSend() {
    setIsAddfriendLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/friend_request?requested_id=" + e._id,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      if (data == "sended") {
        setTimeout(() => {
          setIsAddfriendLoading(false);
          setShowButton("FreindRequestCancle");
          dispatch(send_freindRequest(!SENT_FREINDREQUEST));
        }, 500);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  // handle conform request
  async function handleConfirm() {
    setIsConfirmedLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/confirm_friend_request?conform_id=" + e._id,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;

      if (data == "confirmed")
        setTimeout(() => {
          setIsConfirmedLoading(false);
          setShowButton("none");
          dispatch(confirm_freindRequest(e._id));
        }, 500);
    } catch (error) {
      console.log("Error", error);
    }
  }

  // handle cancle friend request

  async function cancleFriendRequest() {
    setCancleLoading(true);
    try {
      const response = await axios({
        merhod: "delete",
        url: URL + "/api/cancle_friend_request?requested_id=" + e._id,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      setTimeout(() => {
        setCancleLoading(false);
        setShowButton("addFriend");
        dispatch(send_freindRequest(!SENT_FREINDREQUEST));
      }, 500);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  function functionalButton() {
    const FreindRequestAccept = (
      <Button
        onClick={() => handleConfirm()}
        sx={{
          width: "150px",
          height: "36px",
          margin: "0  7px",
          textTransform: "none",
          lineHeight: "0.9rem",
        }}
        variant="contained"
      >
        {isConfirmedLoading ? (
          <CircularProgress sx={{ color: "white" }} size="1.6rem" />
        ) : (
          <p> Accept request</p>
        )}
      </Button>
    );

    const FreindRequestCancle = (
      <div className="cancleFreindRequestBurron">
        <Button
          onClick={() => cancleFriendRequest()}
          sx={{
            color: "black",
          }}
          variant="contained"
        >
          {cancleLoading ? (
            <CircularProgress sx={{ color: "#2d87ea" }} size="1.6rem" />
          ) : (
            "Cancle Request"
          )}
        </Button>
      </div>
    );

    const addFriend = (
      <Button
        onClick={() => requestSend()}
        sx={{
          width: "150px",
          height: "36px",
          margin: "0  7px",
          textTransform: "none",
          lineHeight: "0.9rem",
        }}
        variant="contained"
      >
        {isAddFriendLoading ? (
          <CircularProgress sx={{ color: "white" }} size="1.6rem" />
        ) : (
          <>
            <p> Add Friend</p>
          </>
        )}
      </Button>
    );

    if (USER.id == e._id || is_freind) return null;
    if (showButton == "FreindRequestCancle") return FreindRequestCancle;
    if (showButton == "FreindRequestAccept") return FreindRequestAccept;
    if (showButton == "addFriend") return addFriend;
    if (CONFIRM_FREINDREQUEST == e._id) return null;
  }

  return (
    <Card style={{ marginTop: "15px", backgroundColor: BACKGROUND_COLOR_SUB }}>
      <CardContent>
        <div className="userFriendBox">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={e.profilePic ? URL + "/" + e.profilePic : contact}
              alt=""
            />
            <p style={{ marginLeft: " 6px", color: FONTCOLOR }}>
              {e.userName == USER.firstName + " " + USER.lastName
                ? "You"
                : e.userName}
            </p>
          </div>
          {functionalButton()}
        </div>
      </CardContent>
    </Card>
  );
}

export default FreindUserBox;
