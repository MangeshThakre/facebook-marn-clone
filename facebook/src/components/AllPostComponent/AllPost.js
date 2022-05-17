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
import { useState } from "react";
import { useSelector } from "react-redux";
function AllPost({ text, photo, bg }) {
  const [commentText, setCommentText] = useState("");
  const USER = useSelector((state) => state.globle.user);

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
          style={{ backgroundImage: `url(${bg})`, color: "white" }}
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
            <img src={photo} alt="" />
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
                <p>time ago</p>
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
