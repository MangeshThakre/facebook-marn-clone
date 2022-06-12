import React from "react";
import "./friendcardSmall.css";
import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import contact from "../../../../image/contact.png";
import Button from "@mui/material/Button";
import { useRef, useState, useEffect } from "react";
function FriendCardSmall({ user, type, friendRequests }) {
  //   const { USERID } = useParams();
  const removeFriendCardSmall = useRef(null);
  const friend_requests = friendRequests;
  const request_suggest = user;
  const userName = user.userName;
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL;
  const prifilePic = user.profilePic ? URL + "/" + user.profilePic : contact;
  const [requestSended, setRequesSended] = useState(false);
  const [requestMessage, setRequesMessage] = useState("");

  console.log(type);

  // useEffect(() => {
  //   if (type == "SUGGESTION")
  //     for (const friend_request_id of friend_requests) {
  //       if (friend_request_id.request_id === request_suggest._id) {
  //         setRequesSended(true);
  //         setRequesMessage("Request sent");
  //       }
  //     }
  // });

  const Suggestions = (
    <div className="FriendCardSmall" ref={removeFriendCardSmall}>
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
            <p>{userName}</p>
          </b>
          {requestSended ? (
            <div>
              <Button style={{ display: "none" }} variant="contained">
                Add frined
              </Button>
              <div className="FriendCardSmalrightRemove">
                <Button
                  variant="contained"
                  sx={{ color: "black" }}
                  onClick={() => removeFriendCardSmall.current.remove()}
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Button variant="contained">Add frined</Button>
              <div className="FriendCardSmalrightRemove">
                <Button
                  variant="contained"
                  sx={{ color: "black" }}
                  onClick={() => removeFriendCardSmall.current.remove()}
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
    <div className="FriendCardSmall" ref={removeFriendCardSmall}>
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
            <p>{userName}</p>
          </b>
          <div>
            <Button variant="contained">Confirm</Button>
            <div className="FriendCardSmalrightRemove">
              <Button variant="contained" sx={{ color: "black" }}>
                cancle
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
          <div className="FriendCardSmall" ref={removeFriendCardSmall}>
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
                <p>{userName}</p>
              </b>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FriendCardSmall;
