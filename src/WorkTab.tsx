import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import * as React from "react";
import { ChipRow } from "./ProjectTab";
import { ToolIcon, toolIconFile } from "./ToolIcon";

// icons
import HexagonIcon from "@mui/icons-material/Hexagon";
import BuildIcon from "@mui/icons-material/Build";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export const WorkCard = (props: {
  work: WorkData;
  project?: ProjectData;
  horizontal?: boolean;
}) => {
  const { work, project, horizontal } = props;
  // bare file names (e.g. "sazanami.jpg") live in public/works; URLs are used as is
  const img_path = work.mainImage
    ? /^(https?:)?\/\//.test(work.mainImage) || work.mainImage.startsWith("/")
      ? work.mainImage
      : `/works/${work.mainImage}`
    : null;
  const description = work.description ?? project?.description;
  // YAML loaders may turn bare dates into Date objects
  const createDate = work.createDate
    ? new Date(work.createDate).toISOString().slice(0, 10)
    : null;
  const [open, setOpen] = React.useState(false);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: horizontal ? { xs: "column", sm: "row" } : "column",
        height: "100%",
      }}
    >
      {img_path ? (
        <CardActionArea
          onClick={() => setOpen(true)}
          sx={
            horizontal
              ? { width: { xs: "100%", sm: 320 }, flexShrink: 0 }
              : undefined
          }
        >
          <CardMedia
            component="img"
            sx={{
              aspectRatio: "16 / 9",
              height: "auto",
              width: "100%",
              objectFit: "cover",
            }}
            image={img_path}
            alt="Work Feature Image"
          />
        </CardActionArea>
      ) : null}
      {img_path ? (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
          <Box
            component="img"
            src={img_path}
            alt={work.name}
            onClick={() => setOpen(false)}
            sx={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "90vh",
              cursor: "zoom-out",
            }}
          />
        </Dialog>
      ) : null}
      <CardContent sx={{ flex: 1 }}>
        <Typography component="div" variant="h6">
          {work.name}
        </Typography>
        {createDate ? (
          <Typography variant="caption" color="text.secondary" component="div">
            Created: {createDate}
          </Typography>
        ) : null}
        {description ? (
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {description}
          </Typography>
        ) : null}
        <ChipRow
          items={work.awards ?? []}
          icon={<WorkspacePremiumIcon />}
          color="primary"
        />
        <ChipRow
          items={(work.materials ?? []).filter((m) => m !== "ｽﾀｯｸﾁｬﾝ")}
          icon={<HexagonIcon />}
        />
        <ChipRow
          items={work.tools ?? []}
          icon={<BuildIcon />}
          iconFor={(t) => {
            const f = toolIconFile(t);
            return f ? <ToolIcon file={f} /> : undefined;
          }}
        />
      </CardContent>
    </Card>
  );
};

// newest first; works without a date go last
export const sortWorksByDate = (works: WorkData[]) => {
  const time = (w: WorkData) =>
    w.createDate ? new Date(w.createDate).getTime() : -Infinity;
  return [...works].sort((a, b) => time(b) - time(a));
};

export default function WorkTab(props: {
  works: WorkData[];
  projects: ProjectData[];
}) {
  const sorted = sortWorksByDate(props.works);
  return (
    <Box>
      <Grid container spacing={2}>
        {sorted.map((w) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={w.id}>
            <WorkCard
              work={w}
              project={props.projects.find((p) => p.id === w.project_id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
