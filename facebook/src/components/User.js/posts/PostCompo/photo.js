import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./photo.css";
import { setPage } from "../../../../redux/userSplice.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
function Photo() {
  const dispatch = useDispatch();
  const [photoData, SetPhotoData] = useState([]);
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const { USERID } = useParams();
  const [isPhotoDataLoading, setIsPhotoDataLoading] = useState(false);

  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);

  useEffect(() => {
    fetchPhoto();
  }, [USERID]);

  async function fetchPhoto() {
    setIsPhotoDataLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/getPhoto?user_id=" + USERID + "&page=1&limit=3",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data.data;
      SetPhotoData(data);
      setIsPhotoDataLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  }

  // console.log(photoData);
  return (
    <div className="photo">
      <Card
        sx={{ borderRadius: "10px", backgroundColor: SUB_BACKGROUND_COLOR }}
      >
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ color: FONTCOLOR }}>Photos</h3>

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
            {isPhotoDataLoading ? (
              <Skeleton
                variant="rectangular"
                width={120}
                height={120}
                sx={{ bgcolor: "grey.200", margin: " 5px 0 0 12px " }}
              />
            ) : photoData.length != 0 ? (
              photoData.map((e, i) => {
                return (
                  <img
                    className="PostphotoBox"
                    src={URL + "/" + e.photo}
                    key={i}
                    alt=""
                  />
                );
              })
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Photo;
