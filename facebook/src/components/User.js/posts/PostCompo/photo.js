import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
function Photo({ setPage }) {
  return (
    <div className="photo">
      <Card sx={{ borderRadius: "10px" }}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Photos</h3>
          <div className="Photo_button" onClick={() => setPage("PHOTOS")}>
            <div>
              <p> See all Photos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Photo;
