import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { ChipRow } from "./ProjectTab";

// icons
import HexagonIcon from "@mui/icons-material/Hexagon";
import BuildIcon from "@mui/icons-material/Build";
import EventIcon from "@mui/icons-material/Event";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export const WorkCard =(props: { work: WorkData; project?: ProjectData }) => {
  const { work, project } = props;
  const img_path = work.mainImage ?? null;
  const description = work.description ?? project?.description;
  const href = project?.protopedia_id
    ? `https://protopedia.net/prototype/${project.protopedia_id}`
    : undefined;

  return (
    <Card sx={{ flexDirection: "column", height: "100%" }}>
      {img_path ? (
        <CardActionArea
          component={Link}
          href={href}
          target="_blank"
          rel="noopener"
          disabled={!href}
        >
          <CardMedia
            component="img"
            sx={{ height: { xs: 160, sm: 240 }, maxWidth: 800 }}
            image={img_path}
            alt="Work Feature Image"
          />
        </CardActionArea>
      ) : null}
      <CardContent>
        <Typography component="div" variant="h6">
          {work.name}
        </Typography>
        {project && project.name !== work.name ? (
          <Typography variant="body2" color="text.secondary">
            Project: {project.name}
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
          items={work.exhibitions ?? []}
          icon={<EventIcon />}
          color="secondary"
        />
        <ChipRow
          items={work.competitions ?? []}
          icon={<EmojiEventsIcon />}
          color="secondary"
        />
        <ChipRow
          items={(work.materials ?? []).filter((m) => m !== "ｽﾀｯｸﾁｬﾝ")}
          icon={<HexagonIcon />}
        />
        <ChipRow items={work.tools ?? []} icon={<BuildIcon />} />
      </CardContent>
    </Card>
  );
};

export default function WorkTab(props: {
  works: WorkData[];
  projects: ProjectData[];
}) {
  return (
    <Box>
      <Grid container spacing={2}>
        {props.works.map((w) => (
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
