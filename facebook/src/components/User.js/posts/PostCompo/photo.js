import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./photo.css";
import { setPage } from "../../../../redux/userSplice.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Photo() {
  const dispatch = useDispatch();
  const [photoData, SetPhotoData] = useState([]);
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const { USERID } = useParams();
  useEffect(() => {
    fetchPhoto();
  }, [USERID]);

  async function fetchPhoto() {
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/getPhoto?user_id=" + USERID + "&page=1&limit=3",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      SetPhotoData(data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  // console.log(photoData);
  return (
    <div className="photo">
      <Card sx={{ borderRadius: "10px" }}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Photos</h3>

            <div
              className="Photo_button"
              onClick={() => dispatch(setPage("PHOTOS"))}
            >
              <div>
                <p> See all Photos</p>
              </div>
            </div>
          </div>
          <div className="PostPhotoBody">
            {photoData.length != 0
              ? photoData.map((e, i) => {
                  return (
                    <img
                      className="PostphotoBox"
                      src={URL + "/" + e.photo}
                      key={i}
                      alt=""
                    />
                  );
                })
              : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Photo;
