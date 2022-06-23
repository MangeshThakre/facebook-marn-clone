import React from "react";
import Card from "@mui/material/Card";
import CloseIcon from "@mui/icons-material/Close";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";
import {
  togglePostDelete,
  deletePostId,
  ActualdeletePostId,
  posts,
} from "../../../../redux/globleSplice";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import "./postDeleteComponent.css";

function PostDeleteComponent() {
  const dispatch = useDispatch();
  const DELETEPOSTID = useSelector((state) => state.globle.deletePostId);
  const USER = JSON.parse(localStorage.getItem("LOCALUSER"));
  const TOKEN = localStorage.getItem("TOKEN");
  const URL = process.env.REACT_APP_API_URL;
  const POSTS = useSelector((state) => state.globle.posts);
  const [isLoading, setLoading] = useState(false);

  ///   dark light mode
  const SUB_BACKGROUND_COLOR = useSelector(
    (state) => state.darkLight.backgroundColor_sub
  );
  const BACKGROUNDCOLOR_SUB_FANT = useSelector(
    (state) => state.darkLight.backgroundColor_sub_fant
  );
  const ICONCOLOR = useSelector((state) => state.darkLight.iconColor);
  const FONTCOLOR = useSelector((state) => state.darkLight.fontColor);
  const POPUPBACKGROUND = useSelector(
    (state) => state.darkLight.popupBackground
  );
  //

  async function remove() {
    setLoading(true);
    try {
      const response = await axios({
        methode: "get",
        url: URL + "/api/delete_post?postId=" + DELETEPOSTID,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response;
      dispatch(ActualdeletePostId(DELETEPOSTID));
      dispatch(deletePostId(""));
      setTimeout(() => dispatch(togglePostDelete(false)), 500);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div
      className="PostDeleteComponentBody"
      style={{ backgroundColor: POPUPBACKGROUND }}
      onClick={() => {
        dispatch(togglePostDelete(false));
        dispatch(deletePostId(""));
      }}
    >
      <div className="postDeletepopupBox">
        <Card
          sx={{ borderRadius: "7px", backgroundColor: SUB_BACKGROUND_COLOR }}
        >
          <div className="postDeletepopup_head">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: FONTCOLOR,
              }}
            >
              <h3>Are you Sure?</h3>
            </div>
            <div
              className="postDeletepopup_close"
              style={{ backgroundColor: BACKGROUNDCOLOR_SUB_FANT }}
            >
              <IconButton
                onClick={() => {
                  dispatch(togglePostDelete(false));
                  dispatch(deletePostId(""));
                }}
              >
                <CloseIcon sx={{ color: ICONCOLOR }} />
              </IconButton>
            </div>
          </div>

          <Divider />
          <CardContent>
            <div style={{ color: ICONCOLOR }}>
              <p>
                Are you sure you want to remove this post from your profile?
              </p>
            </div>
          </CardContent>

          <CardContent>
            <div className="postDeletePopPuoFooter">
              <div></div>
              <div>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => {
                      dispatch(togglePostDelete(false));
                      dispatch(deletePostId(""));
                    }}
                  >
                    Cancle
                  </Button>
                </div>
                <Button onClick={() => remove()} variant="contained">
                  {isLoading ? (
                    <CircularProgress sx={{ color: "white" }} size="1.6rem" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PostDeleteComponent;
