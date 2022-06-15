import React, { useEffect } from "react";
import "./info.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import Button from "@mui/material/Button";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { useDispatch, useSelector } from "react-redux";
import { toggleAboutPopUp } from "../../../../redux/globleSplice.js";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

function Info() {
  const dispatch = useDispatch();
  const { USERID } = useParams();
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const [bio_button, setInfo_button] = useState(false);
  const [text_bio, setText_bio] = useState("");
  const [bio, setBio] = useState("");
  const [isBioTextLoading, setIsBioTextLoading] = useState(false);
  const BIO = useSelector((state) => state.user.bio);

  useEffect(() => {
    setBio(BIO);
    setText_bio(BIO);
    setInfo_button(false);
  }, []);
  //   save bio text
  async function bioSave() {
    setIsBioTextLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/bio",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: { text_bio },
      });
      const data = response.data;
      if (data === "updated") {
        setBio(text_bio);
        setInfo_button(false);
        setIsBioTextLoading(false);
      }
    } catch (error) {
      console.log("eror", error);
      setIsBioTextLoading(false);
    }
  }

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
              bioSave();
            }}
          >
            {isBioTextLoading ? (
              <CircularProgress sx={{ color: "white" }} size="1.6rem" />
            ) : (
              "save"
            )}
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ wordBreak: "break-all" }}>{bio}</p>
      </div>
      {USERID == USER.id ? (
        <button
          onClick={() => {
            setInfo_button(true);
          }}
        >
          <p>Add bio</p>
        </button>
      ) : null}
    </>
  );

  const userDetail = (
    <>
      {USERID == USER.id ? (
        <button onClick={() => dispatch(toggleAboutPopUp(true))}>
          <p>Edit Detail</p>
        </button>
      ) : null}
    </>
  );

  return (
    <div className="Intro">
      <Card sx={{ borderRadius: "10px" }}>
        <CardContent>
          <h2>Intro</h2>
          <div className="InfoButtons">
            {info}
            {userDetail}

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
