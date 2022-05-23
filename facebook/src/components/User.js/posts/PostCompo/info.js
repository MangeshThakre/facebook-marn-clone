import React from "react";
import "./info.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import Button from "@mui/material/Button";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { useDispatch } from "react-redux";
import { toggleAboutPopUp } from "../../../../redux/globleSplice.js";
function Info() {
  const dispatch = useDispatch();
  const [bio_button, setInfo_button] = useState(false);
  const [text_bio, setText_bio] = useState("");
  const [bio, setBio] = useState("");
  const info = bio_button ? (
    <div className="info_component">
      <div className="info_component_upper">
        <input
          value={text_bio}
          type="text"
          placeholder="Discribe who you are"
          onChange={(e) => setText_bio(e.target.value)}
        />
        <div>
          <p>{101 - text_bio.length} characters remaining</p>
        </div>
      </div>
      <div className="info_component_lower">
        <div style={{ display: "flex" }}>
          <PublicOutlinedIcon />
          <p>Public</p>
        </div>
        <div>
          <Button variant="contained" onClick={() => setInfo_button(false)}>
            cancle
          </Button>
          <Button
            variant="contained"
            disabled={text_bio.length > 100}
            onClick={() => {
              setBio(text_bio);
              setInfo_button(false);
            }}
          >
            save
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>{bio}</p>
      </div>
      <button
        onClick={() => {
          setInfo_button(true);
        }}
      >
        <p>Add bio</p>
      </button>
    </>
  );

  return (
    <div className="Intro">
      <Card sx={{ borderRadius: "10px" }}>
        <CardContent>
          <h2>Intro</h2>
          <div className="InfoButtons">
            {info}
            <button onClick={() => dispatch(toggleAboutPopUp(true))}>
              <p>Edit Detail</p>
            </button>

            <button>
              <p>Edit hobbies</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Info;
