import React from "react";
import Card from "@mui/material/Card";
import contact from "../../../../image/contact.png";
import CardContent from "@mui/material/CardContent";
import {
  toggleCreatePost,
  togglePhotoVideo,
} from "../../../../redux/globleSplice.js";
import { useDispatch, useState } from "react-redux";
import Divider from "@mui/material/Divider";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import NewPosts from "../../newPosts/newPosts.js";
import "./create.css";
function Create() {
  const dispatch = useDispatch();
  return (
    <div className="Create">
      <Card sx={{ height: "122.8px", borderRadius: "10px" }}>
        <CardContent>
          <div
            className="Create_upper"
            style={{ display: "flex", marginBottom: "10px" }}
          >
            <img src={contact} alt="" />
            <div
              className="input"
              onClick={() => {
                dispatch(toggleCreatePost(true));
              }}
              style={{ cursor: "pointer", backgroundColor: "#f0f2f5" }}
            >
              <p
                style={{
                  backgroundColor: "#f0f2f5",
                  width: "80%",
                  border: "none",
                  outline: "none",
                  fontSize: "1.063rem",
                }}
              >
                What's on your mind?
              </p>
            </div>
          </div>
          <Divider variant="middle" />
          <div className="Create_bottom">
            <IconButton
              onClick={() => {
                dispatch(toggleCreatePost(true));
                dispatch(togglePhotoVideo(true));
              }}
            >
              <PhotoLibraryIcon sx={{ color: "green" }} />
            </IconButton>
            <IconButton>
              <LocationOnIcon sx={{ color: "#f5533d" }} />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Create;
