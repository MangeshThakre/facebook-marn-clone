import React from "react";
import "./friendcardSmall.css";
import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import contact from "../../../../image/contact.png";
import Button from "@mui/material/Button";
function FriendCardSmall({ user, type }) {
  //   const { USERID } = useParams();
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL;
  const prifilePic = user.profilePic ? URL + "/" + user.profilePic : contact;
  const userName = user.userName;

  return (
    <div className="FriendCardSmall">
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
          {type != "FREIND" ? (
            <>
              <b>
                <p>{userName}</p>
              </b>
              <div>
                <Button variant="contained">Add frined</Button>
                <div className="FriendCardSmalrightRemove">
                  <Button variant="contained" sx={{ color: "black" }}>
                    Remove
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <b>
                <p style={{ cursor: "pointer" }}>{userName}</p>
              </b>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendCardSmall;
