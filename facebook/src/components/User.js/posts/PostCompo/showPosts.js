import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
function ShowPosts() {
  return (
    <div className="showPosts">
      <Card sx={{ borderRadius: "10px" }}>
        <CardContent>
          <div className="showePosts_upper">
            <h2>Posts</h2>
          </div>
          <div className="showPots_lower"></div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ShowPosts;
