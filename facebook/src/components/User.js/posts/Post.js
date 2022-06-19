import React from "react";
import "./post.css";
import Grid from "@mui/material/Grid";
import Info from "./PostCompo/info.js";
import Photo from "./PostCompo/photo";
import Friends from "./PostCompo/friends";
import Create from "./PostCompo/create";
import ShowPosts from "./PostCompo/showPosts";
import { useRef } from "react";
import { useSelector } from "react-redux";
function Post({ setPage }) {
  const scrollPostRef = useRef(null);

  return (
    <div className="posts">
      <div className="container">
        <Grid container>
          <Grid xs={12} md={6}>
            <div>
              <Grid>
                <div>
                  <Info />
                </div>
              </Grid>
              <Grid>
                <div>
                  <Photo setPage={setPage} />
                </div>
              </Grid>
              <Grid>
                <div>
                  <Friends setPage={setPage} />
                </div>
              </Grid>
              <Grid>
                <p>
                  Privacy·Terms · Advertising · Ad Choices · Cookies · Meta ©
                  2022
                </p>
              </Grid>
            </div>
          </Grid>
          <Grid xs={12} md={6}>
            <div
              ref={scrollPostRef}
              style={{ height: "100vh", overflowY: "auto" }}
            >
              <Grid>
                <div>
                  <Create />
                </div>
              </Grid>
              <Grid>
                <div>
                  <ShowPosts scrollPostRef={scrollPostRef} />
                </div>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Post;
