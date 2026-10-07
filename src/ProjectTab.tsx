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
import HexagonIcon from "@mui/icons-material/Hexagon";
import BuildIcon from "@mui/icons-material/Build";
import TagIcon from "@mui/icons-material/Tag";
import EventIcon from "@mui/icons-material/Event";
import ConstructionIcon from "@mui/icons-material/Construction";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

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

const ProjectCard = (props: { project: ProjectData; works: WorkData[] }) => {
  const { project, works } = props;
  const ss = project.mainImage?.split("/");
  const img_path = ss ? `./prototypes/${ss[ss.length - 1]}` : null;

  const uniq = (f: (w: WorkData) => string[]) =>
    Array.from(new Set(works.flatMap(f))).filter((m) => m !== "ｽﾀｯｸﾁｬﾝ");

  const href = projectPath(project.id);

  return (
    <Card sx={{ flexDirection: "column", height: "100%" }}>
      <CardActionArea component={Link} href={href} onClick={linkClick(href)}>
        {img_path ? (
          <CardMedia
            component="img"
            sx={{ height: { xs: 160, sm: 240 }, maxWidth: 800 }}
            image={img_path}
            alt="Project Feature Image"
          />
        ) : null}
      </CardActionArea>
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
        <ChipRow items={works.map((w) => w.name)} icon={<ConstructionIcon />} />
        <ChipRow
          items={uniq((w) => w.awards ?? [])}
          icon={<WorkspacePremiumIcon />}
          color="primary"
        />
        <ChipRow
          items={uniq((w) => w.competitions ?? [])}
          icon={<EventIcon />}
          color="secondary"
        />
        <ChipRow items={uniq((w) => w.materials)} icon={<HexagonIcon />} />
        <ChipRow items={uniq((w) => w.tools)} icon={<BuildIcon />} />
        <ChipRow items={project.topics ?? []} icon={<TagIcon />} />
      </CardContent>
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
  works: WorkData[];
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
            <ProjectCard
              project={p}
              works={props.works.filter((w) => w.project_id === p.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
