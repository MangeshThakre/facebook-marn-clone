import React from "react";
import "./addPhoto.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useState, useRef } from "react";

function AddPhoto() {
  const tergetInputRef = useRef(null);
  const viewPhoto = useState(null);
  const [PhotoFile, setPhotoFile] = useState(null);
  const [base64Image, setBase64Image] = useState("");

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
        {!PhotoFile ? (
          <div
            className="AddPhoto_body"
            onClick={() => console.log(tergetInputRef.current.click())}
          >
            <div>
              <AddPhotoAlternateIcon />
              <p>Add Photos/Videos</p>
              <input
                type="file"
                ref={tergetInputRef}
                pattern="([^\s]+(\.(?i)(jpg|png|gif|bmp))$)"
                onChange={(e) => handleFile(e)}
                style={{ display: "none" }}
              />
            </div>
          </div>
        ) : (
          <div
            ref={viewPhoto}
            style={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={base64Image ? base64Image : null} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddPhoto;
