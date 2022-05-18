import React from "react";
import "./AllPost.css";
import IconButton from "@mui/material/IconButton";
import contact from "../../image/contact.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import InputEmoji from "react-input-emoji";
import Divider from "@mui/material/Divider";
import date from "date-and-time";
import { useState } from "react";
import { useSelector } from "react-redux";
import nightSky from "../../image/nightSky.png";
import iceCream from "../../image/iceCream.png";
import orange from "../../image/orange.png";
import purple from "../../image/purple.png";
import radient from "../../image/radiend.png";
import plain from "../../image/plain.png";
import heart from "../../image/hart.png";

function AllPost({ postData }) {
  const [commentText, setCommentText] = useState("");
  const USER = useSelector((state) => state.globle.user);
  const URL = process.env.REACT_APP_API_URL;
  const text = postData.text;
  const photo = postData.photo;
  var bg;
  if (postData.bg == "iceCream") bg = iceCream;
  if (postData.bg == "nightSky") bg = nightSky;
  if (postData.bg == "orange") bg = orange;
  if (postData.bg == "purple") bg = purple;
  if (postData.bg == "radient") bg = radient;
  if (postData.bg == "plain") bg = plain;
  if (postData.bg == "heart") bg = heart;
  if (postData.bg == "null") bg = null;

  const posted_at = date.format(new Date(postData.posted_at), "MMM DD YYYY");
  const send = () => {
    setCommentText("");
  };

  function PostBodyFun() {
    if (bg == null && photo == null) {
      return (
        <div>
          <p>{text}</p>
        </div>
      );
    }
    if (bg != null) {
      return (
        <div
          className="AllPost_bodyBackground"
          style={{ backgroundImage: `url(  ${bg})`, color: "white" }}
        >
          <h2>{text}</h2>
        </div>
      );
    }
    if (photo != null) {
      return (
        <>
          <div>{text}</div>
          <div className="AllPost_body_photo">
            <img src={URL + "/" + photo} alt="" />
          </div>
        </>
      );
    }
  }

  return (
    <div className="AddPost">
      <Card sx={{ borderRadius: "10px" }}>
        <CardContent>
          <div className="AllPost_upper">
            <div className="createPosts_body_header_pic">
              <img src={contact} alt="pic" />
            </div>
            <div>
              <h5>{USER?.firstName + " " + USER?.lastName}</h5>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p> {posted_at}</p>
                <PublicOutlinedIcon sx={{ fontSize: "20px" }} />
              </div>
            </div>
          </div>
          <div className="AllPost_body">{PostBodyFun()}</div>

          <div className="AllPost_lower">
            <div className="AllPost_lower_likeShareComment">
              <div>
                <IconButton>
                  <ThumbUpAltOutlinedIcon />
                </IconButton>
              </div>
              <div>
                <IconButton>
                  <ChatBubbleOutlineOutlinedIcon />
                </IconButton>
              </div>
            </div>

            <Divider variant="middle" />
            <div className="AllPost_lower_inputMessage">
              <InputEmoji
                value={commentText}
                onChange={setCommentText}
                onEnter={commentText != "" ? send : null}
                placeholder="Type a message"
              />

              <p style={{ fontSize: "10px" }}> Press Enter to post.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AllPost;
