import React from "react";

import { Card, CardContent } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { flexbox } from "@mui/system";

function FriendUserBoxSkeleton({ color }) {
  return (
    <div>
      <Card sx={{ backgroundColor: color }}>
        <CardContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Skeleton
              variant="rectangular"
              width={80}
              height={80}
              sx={{ bgcolor: "grey.200", margin: " 12px 0 0 12px " }}
            />
            <dv>
              <Skeleton
                variant="rectangular"
                width={100}
                height={10}
                sx={{ bgcolor: "grey.200", margin: " 12px 0 0 12px " }}
              />
              <Skeleton
                variant="rectangular"
                width={80}
                height={10}
                sx={{ bgcolor: "grey.200", margin: " 12px 0 0 12px " }}
              />
            </dv>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FriendUserBoxSkeleton;
