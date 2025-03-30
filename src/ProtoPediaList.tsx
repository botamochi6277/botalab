import * as React from "react";
// mui
import { Box, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

// icons
import HistoryIcon from "@mui/icons-material/History";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import UpdateIcon from "@mui/icons-material/Update";

// assets

import ProtoTypeCard from "./PrototypeCard";

const OrderButtons = (props: {
  currentOrder: string;
  items: { order: string; icon: React.ReactElement }[];
  setOrder: (s: string) => void;
}) => {
  const buttons = props.items.map((item) => {
    return (
      <IconButton
        key={`btn-${item.order}`}
        color={item.order === props.currentOrder ? "primary" : "default"}
        onClick={() => {
          props.setOrder(item.order);
        }}
      >
        {item.icon}
      </IconButton>
    );
  });
  return buttons;
};

export default function ProtoPediaList(props: {
  prototypes: PrototypeV2Data[];
}) {
  const [order, setOrder] = React.useState("views");

  const mySort = (a: PrototypeV2Data, b: PrototypeV2Data, order: string) => {
    switch (order) {
      case "ids":
        return a.id - b.id; // decrease
      case "views":
        return b.viewCount - a.viewCount;
      case "goods":
        return b.goodCount - a.goodCount;
      case "updatedDate":
        return Date.parse(b.updateDate) - Date.parse(a.updateDate);
      default:
        return 1;
    }
  };
  const items = props.prototypes
    .sort((a, b) => mySort(a, b, order))
    .map((p) => {
      return <ProtoTypeCard prototype={p} />;
    });

  return (
    <Box>
      <Box sx={{ justifyItems: "right" }}>
        {/* sorting radio-like buttons */}

        <Typography>
          Sort by:
          <OrderButtons
            currentOrder={order}
            setOrder={setOrder}
            items={[
              { order: "ids", icon: <HistoryIcon /> },
              { order: "views", icon: <VisibilityIcon /> },
              { order: "goods", icon: <ThumbUpIcon /> },
              { order: "updatedDate", icon: <UpdateIcon /> },
            ]}
          />{" "}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {items.map((item, idx) => (
          <Grid xs={12} sm={6} md={4} key={idx}>
            {item}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
