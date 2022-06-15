import React from "react";
import Skeleton from "@mui/material/Skeleton";

function FreindCardSmallSceleton() {
  return (
    <div style={{ display: "flex", marginTop: "5px" }}>
      <Skeleton
        variant="circular"
        width={60}
        height={60}
        sx={{ bgcolor: "grey.200", marginLeft: "12px" }}
      />
      <div>
        <Skeleton
          variant="rectangular"
          width={100}
          height={10}
          sx={{ bgcolor: "grey.200", margin: " 12px 0 0 12px " }}
        />
        <Skeleton
          variant="rectangular"
          width={200}
          height={20}
          sx={{ bgcolor: "grey.200", margin: " 5px 0 0 12px " }}
        />
      </div>
    </div>
  );
}

export default FreindCardSmallSceleton;
