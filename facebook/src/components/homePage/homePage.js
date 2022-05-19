import React from "react";
import "./homePage.css";
import HomePageRight from "./homePageRight/homePageRight";
import HomePageLeft from "./homePageLeft/homePageLeft";
import HomePageMiddle from "./homePageMiddle/homePageMiddle";
import NewPosts from "../User.js/newPosts/newPosts.js";
import { useSelector } from "react-redux";
function HomePage() {
  const toggleCreatePost = useSelector(
    (state) => state.globle.toggleCreatePost
  );
  return (
    <div className="homePage">
      {toggleCreatePost ? <NewPosts /> : null}

      <div className="homePageBody">
        <HomePageLeft />
        <HomePageMiddle />
        <HomePageRight />
      </div>
    </div>
  );
}

export default HomePage;
