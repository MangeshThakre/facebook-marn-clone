import React from "react";
import Skeleton from "@mui/material/Skeleton";

function FreindCardSkeleton() {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        width={150}
        height={150}
        sx={{ bgcolor: "grey.210", margin: " 12px 0 0 12px " }}
      />{" "}
      <Skeleton
        variant="rectangular"
        width={100}
        height={10}
        sx={{ bgcolor: "grey.210", margin: " 12px 0 0 12px " }}
      />
      <Skeleton
        variant="rectangular"
        width={150}
        height={10}
        sx={{ bgcolor: "grey.210", margin: " 12px 0 0 12px " }}
      />
      <Skeleton
        variant="rectangular"
        width={150}
        height={10}
        sx={{ bgcolor: "grey.250", margin: " 12px 0 0 12px " }}
      />
    </div>
  );
}

export default FreindCardSkeleton;
