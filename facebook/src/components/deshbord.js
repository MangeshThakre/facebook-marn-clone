import React, { useEffect } from "react";
import Navbar from "./navbar/navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import NewPosts from "./User.js/newPosts/newPosts";
function Deshbord() {
  const backgroundColor = useSelector(
    (state) => state.darkLight.backgroundColor
  );

  // const [user, setUser] = useState(true);
  const user = 1;
  const navigate = useNavigate();
  useEffect(() => {
    user ? navigate("/") : navigate("/signin");
  }, []);

  return (
    <div
      className="dashbord"
      style={{ height: "100vh", backgroundColor: backgroundColor }}
    >
      <div className="navBar" style={{ height: "56px" }}>
        <Navbar />
      </div>
    </div>
  );
}

export default Deshbord;
