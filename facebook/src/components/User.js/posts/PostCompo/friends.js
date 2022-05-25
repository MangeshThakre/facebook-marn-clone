import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { setPage } from "../../../../redux/userSplice.js";
import { useDispatch } from "react-redux";
function Friends({ setPage }) {
  const dispatch = useDispatch();

  return (
    <div className="friend">
      <Card sx={{ borderRadius: "10px" }}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Friends</h3>
          <div
            className="Freind_button"
            onClick={() => dispatch(setPage("FRIENDS"))}
          >
            <div>
              <p> See all friends</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Friends;
