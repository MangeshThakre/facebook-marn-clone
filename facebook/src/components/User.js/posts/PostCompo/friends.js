import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
function Friends({ setPage }) {
  return (
    <div className="friend">
      <Card sx={{ borderRadius: "10px" }}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Friends</h3>
          <div className="Freind_button" onClick={() => setPage("PHOTOS")}>
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
