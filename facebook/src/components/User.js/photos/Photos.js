import React from "react";
import { Card, CardContent } from "@mui/material";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import { useRef, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Photos() {
  const URL = process.env.REACT_APP_API_URL;
  const TOKEN = localStorage.getItem("TOKEN");
  const { USERID } = useParams();
  const observer = useRef(null);
  const [photoData, setPhotoData] = useState([]);
  const [isPhotoDataLoading, setIsPhotoDataLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);
  const ICONCOLOR = useSelector((state) => state.darkLight.iconColor);
  const BACKGROUNDCOLOR_SUB_FANT = useSelector(
    (state) => state.darkLight.backgroundColor_sub_fant
  );

  useEffect(() => {
    fetchPhoto();
  }, []);

  const lastPhotoRef = useCallback(
    (node) => {
      if (isPhotoDataLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (hasMore) {
            fetchPhoto();
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [isPhotoDataLoading]
  );

  async function fetchPhoto() {
    setIsPhotoDataLoading(true);
    try {
      const response = await axios({
        method: "get",
        url:
          URL +
          "/api/getPhoto?user_id=" +
          USERID +
          "&page=" +
          page +
          "&limit=10",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;

      if (data.next) {
        setHasMore(true);
        setPage(data.next.page);
      } else setHasMore(false);
      setPhotoData([...photoData, ...data.data]);
      setIsPhotoDataLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div style={{ width: "1186px", marginBottom: "20px" }}>
      <Card sx={{ borderRadius: "7px", backgroundColor: SUB_BACKGROUND_COLOR }}>
        <CardContent>
          <div className="userPhotoHeader">
            <h3 style={{ color: FONTCOLOR }}>Photoss</h3>
          </div>
          <Divider variant="middle" sx={{ margin: "20px 0 20px" }} />

          <div className="userPhotoBody">
            {photoData.map((e, i) => {
              if (photoData.length === i + 1) {
                return (
                  <img
                    ref={lastPhotoRef}
                    style={{
                      height: "193px",
                      width: "193px",
                      borderRadius: "6px",
                    }}
                    key={i}
                    src={URL + "/" + e.photo}
                    alt=""
                  />
                );
              } else {
                return (
                  <img
                    ref={lastPhotoRef}
                    style={{
                      height: "193px",
                      width: "193px",
                      borderRadius: "6px",
                    }}
                    key={i}
                    src={URL + "/" + e.photo}
                    alt=""
                  />
                );
              }
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Photos;
