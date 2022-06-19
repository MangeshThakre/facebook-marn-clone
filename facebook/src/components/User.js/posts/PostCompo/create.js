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
import { useSelector } from "react-redux";

function Create() {
  const dispatch = useDispatch();
  const PROFILEPIC = useSelector((state) => state.user.profilePicture);
  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  const ICONCOLOR = useSelector((state) => state.darkLight.iconColor);

  const BACKGROUNDCOLOR_SUB_FANT = useSelector(
    (state) => state.darkLight.backgroundColor_sub_fant
  );
  return (
    <div className="Create">
      <Card
        sx={{
          height: "122.8px",
          borderRadius: "10px",
          backgroundColor: SUB_BACKGROUND_COLOR,
        }}
      >
        <CardContent>
          <div
            className="Create_upper"
            style={{ display: "flex", marginBottom: "10px" }}
          >
            <img src={PROFILEPIC ? PROFILEPIC : contact} alt="" />
            <div
              className="input"
              onClick={() => {
                dispatch(toggleCreatePost(true));
              }}
              style={{
                cursor: "pointer",
                backgroundColor: BACKGROUNDCOLOR_SUB_FANT,
              }}
            >
              <p
                style={{
                  backgroundColor: BACKGROUNDCOLOR_SUB_FANT,
                  width: "80%",
                  border: "none",
                  outline: "none",
                  fontSize: "1.063rem",
                  color: ICONCOLOR,
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
