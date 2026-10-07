import * as React from "react";
// mui
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import CountBadge from "./CountBadge";
import DevelopingStatusBadge from "./DevelopingStatusBadge";
import { linkClick, projectPath } from "./router";

// icons
import HistoryIcon from "@mui/icons-material/History";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import UpdateIcon from "@mui/icons-material/Update";

type ChipColor = "default" | "primary" | "secondary";

export const ChipRow = (props: {
  items: string[];
  icon: React.ReactElement;
  color?: ChipColor;
}) => (
  <Box>
    {props.items.map((s) => (
      <Chip
        key={s}
        icon={props.icon}
        label={s}
        size="small"
        color={props.color}
        sx={{ margin: 0.5, fontSize: 11 }}
      />
    ))}
  </Box>
);

const ProjectCard = (props: { project: ProjectData }) => {
  const { project } = props;
  const ss = project.mainImage?.split("/");
  const img_path = ss ? `./prototypes/${ss[ss.length - 1]}` : null;

  const href = projectPath(project.id);

  return (
    <Card sx={{ flexDirection: "column", height: "100%" }}>
      <CardActionArea
        component={Link}
        href={href}
        onClick={linkClick(href)}
        sx={{ height: "100%", display: "block" }}
      >
        {img_path ? (
          <CardMedia
            component="img"
            sx={{ height: { xs: 160, sm: 240 }, maxWidth: 800 }}
            image={img_path}
            alt="Project Feature Image"
          />
        ) : null}
        <CardContent>
          <Typography component="div" variant="h6">
            {project.name}
          </Typography>
          <Box sx={{ marginBottom: 1 }}>
            <Stack direction="row" spacing={0.5}>
              <DevelopingStatusBadge status={project.developingStatus} />
              <CountBadge name="view" count={project.viewCount} logo="eye" />
              <CountBadge name="good" count={project.goodCount} logo="thumbsup" />
            </Stack>
          </Box>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {project.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const orders = [
  { order: "createDate", icon: <HistoryIcon /> },
  { order: "views", icon: <VisibilityIcon /> },
  { order: "goods", icon: <ThumbUpIcon /> },
  { order: "updateDate", icon: <UpdateIcon /> },
];

export default function ProjectTab(props: {
  projects: ProjectData[];
}) {
  const [order, setOrder] = React.useState("views");

  const mySort = (a: ProjectData, b: ProjectData) => {
    switch (order) {
      case "createDate":
        return Date.parse(b.createDate) - Date.parse(a.createDate);
      case "goods":
        return b.goodCount - a.goodCount;
      case "updateDate":
        return Date.parse(b.updateDate) - Date.parse(a.updateDate);
      default:
        return b.viewCount - a.viewCount;
    }
  };
  const sorted = [...props.projects].sort(mySort);

  return (
    <Box>
      <Box sx={{ justifyItems: "right" }}>
        <Typography component="div">
          Sort by:
          {orders.map((o) => (
            <IconButton
              key={o.order}
              color={o.order === order ? "primary" : "default"}
              onClick={() => setOrder(o.order)}
            >
              {o.icon}
            </IconButton>
          ))}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {sorted.map((p) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
            <ProjectCard project={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
