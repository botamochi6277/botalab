import { Box, Button, Grid, Link, Stack, Typography } from "@mui/material";
import CountBadge from "./CountBadge";
import DevelopingStatusBadge from "./DevelopingStatusBadge";
import { ChipRow } from "./ProjectTab";
import { WorkCard, sortWorksByDate } from "./WorkTab";
import { linkClick } from "./router";

// icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PersonIcon from "@mui/icons-material/Person";
import TagIcon from "@mui/icons-material/Tag";

export default function ProjectDetail(props: {
  project?: ProjectData;
  works: WorkData[];
}) {
  const { project, works } = props;

  const back = (
    <Button
      component="a"
      href="/"
      startIcon={<ArrowBackIcon />}
      onClick={linkClick("/")}
    >
      Projects
    </Button>
  );

  if (!project) {
    return (
      <Box>
        {back}
        <Typography variant="h6">Project not found</Typography>
      </Box>
    );
  }

  const ss = project.mainImage?.split("/");
  const img_path = ss ? `/prototypes/${ss[ss.length - 1]}` : null;

  return (
    <Box>
      {back}
      {img_path ? (
        <Box
          component="img"
          src={img_path}
          alt="Project Feature Image"
          sx={{
            width: "100%",
            maxHeight: 480,
            objectFit: "cover",
            borderRadius: 2,
            mt: 1,
          }}
        />
      ) : null}
      <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
        {project.name}
      </Typography>
      <Stack direction="row" spacing={0.5} sx={{ my: 1 }}>
        <DevelopingStatusBadge status={project.developingStatus} />
        <CountBadge name="view" count={project.viewCount} logo="eye" />
        <CountBadge name="good" count={project.goodCount} logo="thumbsup" />
      </Stack>
      <Typography variant="body2" color="text.secondary">
        Created: {project.createDate.slice(0, 10)} / Updated:{" "}
        {project.updateDate.slice(0, 10)}
      </Typography>
      {project.description ? (
        <Typography variant="subtitle1" sx={{ my: 2 }}>
          {project.description}
        </Typography>
      ) : null}
      {project.protopedia_id ? (
        <Link
          href={`https://protopedia.net/prototype/${project.protopedia_id}`}
          target="_blank"
          rel="noopener"
          sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
        >
          View on ProtoPedia <OpenInNewIcon fontSize="inherit" />
        </Link>
      ) : null}
      <ChipRow items={project.developers ?? []} icon={<PersonIcon />} />
      <ChipRow items={project.topics ?? []} icon={<TagIcon />} />

      <Typography variant="h5" component="h2" sx={{ mt: 3, mb: 1 }}>
        Works
      </Typography>
      <Grid container spacing={2}>
        {sortWorksByDate(works).map((w) => (
          <Grid size={12} key={w.id}>
            <WorkCard work={w} project={project} horizontal />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
