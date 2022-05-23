import React, { useEffect } from "react";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { user } from "../../redux/globleSplice.js";
import NewPosts from "../User.js/newPosts/newPosts";
import HomePage from "../homePage/homePage.js";
import axios from "axios";
function Deshbord() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const USER = useSelector((state) => state.globle.user);
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const backgroundColor = useSelector(
    (state) => state.darkLight.backgroundColor
  );

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    if (USER != null) return;
    setIsLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/verify",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      dispatch(user(data));
      setIsLoading(false);
      localStorage.setItem("LOCALUSER", JSON.stringify(data));
    } catch (error) {
      console.log("Error", error);
      navigate("/signin");
    }
  };

  return (
    <div
      className="dashbord"
      style={{ height: "100vh", backgroundColor: backgroundColor }}
    >
      {isLoading ? (
        " loading"
      ) : (
        <>
          <div className="navBar" style={{ height: "56px" }}>
            <Navbar />
          </div>
          <div className="homePage">
            <HomePage />
          </div>
        </>
      )}
    </div>
  );
}

export default Deshbord;
