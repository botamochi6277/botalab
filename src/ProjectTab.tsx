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
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

type ChipColor = "default" | "primary" | "secondary";

export const ChipRow = (props: {
  items: string[];
  icon: React.ReactElement;
  // per-item icon override (e.g. brand icons); falls back to `icon`
  iconFor?: (item: string) => React.ReactElement | undefined;
  color?: ChipColor;
}) => (
  <Box>
    {props.items.map((s) => (
      <Chip
        key={s}
        icon={props.iconFor?.(s) ?? props.icon}
        label={s}
        size="small"
        color={props.color}
        sx={{ margin: 0.5, fontSize: 11 }}
      />
    ))}
  </Box>
);

const ProjectCard = (props: {
  project: ProjectData;
  pinned: boolean;
  onTogglePin: () => void;
}) => {
  const { project, pinned } = props;
  const ss = project.mainImage?.split("/");
  const img_path = ss ? `./prototypes/${ss[ss.length - 1]}` : null;

  const href = projectPath(project.id);

  return (
    <Card
      sx={{
        position: "relative",
        flexDirection: "column",
        height: "100%",
        ...(pinned && { border: 2, borderColor: "primary.main" }),
      }}
    >
      <IconButton
        size="small"
        aria-label={pinned ? "Unpin project" : "Pin project"}
        color={pinned ? "primary" : "default"}
        onClick={props.onTogglePin}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          bgcolor: "background.paper",
          "&:hover": { bgcolor: "background.paper" },
        }}
      >
        {pinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
      </IconButton>
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

const PIN_KEY = "botalab.pinnedProjects";

// Pins start from `pinned` in projects.yml; the visitor's toggles are kept in localStorage.
const loadPinned = (projects: ProjectData[]): Set<string> => {
  try {
    const saved = localStorage.getItem(PIN_KEY);
    if (saved) return new Set(JSON.parse(saved) as string[]);
  } catch {
    // storage unavailable or corrupted: fall back to the data
  }
  return new Set(projects.filter((p) => p.pinned).map((p) => p.id));
};

export default function ProjectTab(props: {
  projects: ProjectData[];
}) {
  const [order, setOrder] = React.useState("views");
  const [pinned, setPinned] = React.useState(() => loadPinned(props.projects));

  const togglePin = (id: string) => {
    const next = new Set(pinned);
    if (!next.delete(id)) next.add(id);
    setPinned(next);
    try {
      localStorage.setItem(PIN_KEY, JSON.stringify([...next]));
    } catch {
      // ignore: pins just won't persist
    }
  };

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
  const sorted = [...props.projects].sort(
    (a, b) =>
      Number(pinned.has(b.id)) - Number(pinned.has(a.id)) || mySort(a, b),
  );

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
            <ProjectCard
              project={p}
              pinned={pinned.has(p.id)}
              onTogglePin={() => togglePin(p.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
