import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";

function AllPostSkeleton() {
  return (
    <div style={{ marginTop: "10px" }}>
      <Card>
        <CardContent>
          <div style={{ display: "flex", marginTop: "5px" }}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ bgcolor: "grey.200", marginLeft: "12px" }}
            />
            <div>
              <Skeleton
                variant="rectangular"
                width={100}
                height={10}
                sx={{ bgcolor: "grey.200", margin: " 5px 0 0 12px " }}
              />
              <Skeleton
                variant="rectangular"
                width={200}
                height={20}
                sx={{ bgcolor: "grey.200", margin: " 5px 0 0 12px " }}
              />
            </div>
          </div>
          <Divider variant="middle" sx={{ marginTop: "10px" }} />
          <Skeleton
            variant="rectangular"
            width={450}
            height={200}
            sx={{ bgcolor: "grey.200", margin: " 5px 0 0 12px " }}
          />
          <Skeleton
            variant="rectangular"
            width={450}
            height={10}
            sx={{ bgcolor: "grey.200", margin: " 5px 0 0 12px " }}
          />
          <Skeleton
            variant="rectangular"
            width={450}
            height={10}
            sx={{ bgcolor: "grey.200", margin: " 5px 0 0 12px " }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default AllPostSkeleton;
