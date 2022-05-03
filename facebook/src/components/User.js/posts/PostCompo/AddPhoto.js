import React from "react";
import "./addPhoto.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { togglePhotoVideo } from "../../../../redux/globleSplice.js";
import Button from "@mui/material/Button";
function AddPhoto({ setPhotoFile, PhotoFile, base64Image, setBase64Image }) {
  const dispatch = useDispatch();
  const tergetInputRef = useRef(null);
  const viewPhoto = useState(null);
  const handleFile = async (e) => {
    const reader = new FileReader();
    setPhotoFile(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener(
      "load",
      () => {
        setBase64Image(reader.result);
      },
      false
    );
  };

  return (
    <div className="AddPhoto">
      <div style={{ backgroundColor: "#f7f8fa" }}>
        <div className="photoClose">
          <IconButton onClick={() => dispatch(togglePhotoVideo(false))}>
            <CloseIcon />
          </IconButton>
        </div>
        {!PhotoFile ? (
          <div
            className="AddPhoto_body"
            onClick={() => tergetInputRef.current.click()}
          >
            <div>
              <AddPhotoAlternateIcon />
              <p>Add Photos/Videos</p>
            </div>
          </div>
        ) : (
          <div
            ref={viewPhoto}
            style={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div className="Add_close">
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => tergetInputRef.current.click()}
                >
                  <AddPhotoAlternateIcon />
                  Add photos/Videos
                </Button>
              </div>
              <div></div>
            </div>
            <div>
              <img
                style={{
                  objectFit: "cover",
                  maxWidth: "450px",
                  manHeight: "445px",
                }}
                src={base64Image ? base64Image : null}
                alt="phpto"
              />
            </div>
          </div>
        )}
        <input
          type="file"
          ref={tergetInputRef}
          pattern="([^\s]+(\.(?i)(jpg|png|gif|bmp))$)"
          onChange={(e) => handleFile(e)}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}

export default AddPhoto;
