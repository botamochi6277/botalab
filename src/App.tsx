import {
  Box,
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import * as React from "react";

// custom
import ExhibitionTimeline from "./ExhibitionTimeline";
import MyAppBar from "./MyAppBar";
import MyTabs from "./MyTabs";
import ProtoPediaList from "./ProtoPediaList";
import TeamHeader from "./TeamHeader";
import StatsTab from "./StatsTab";
import NetworkTab from "./NetworkTab";
import ProjectTab from "./ProjectTab";
import ProjectDetail from "./ProjectDetail";
import { matchProjectId, usePath } from "./router";

// icons
import {
  Event as EventIcon,
  QueryStats as QueryStatsIcon,
  Collections as CollectionsIcon,
  Hub as HubIcon,
  AccountTree as AccountTreeIcon,
} from "@mui/icons-material";

// assets
import profile from "./assets/profile.json";
import my_theme from "./theme";
import protopediaData from "./assets/prototypes_v2.json";
import projectsData from "./assets/projects.yml";
import worksData from "./assets/works.yml";

function App() {
  const projectId = matchProjectId(usePath());
  const [theme, setTheme] = React.useState(
    createTheme({
      ...my_theme,
      palette: {
        mode: "dark",
      },
    })
  );
  const toggleTheme = (theme: any) => {
    if (theme.palette.mode === "dark") {
      setTheme(createTheme({ ...my_theme, palette: { mode: "light" } }));
    } else {
      setTheme(createTheme({ ...my_theme, palette: { mode: "dark" } }));
    }
  };

  // try to create youtube channel top page
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Stack spacing={1}>
          <MyAppBar theme={theme} onToggleTheme={() => toggleTheme(theme)} />
          {/* Banner/Header Image */}
          {/* https://jp.cyberlink.com/blog/photoeditor/1755/best-photo-software-to-make-youtube-banners#:~:text=YouTube%20ヘッダー・バナーサイズと作成時の注意点,-ヘッダー・バナー作成&text=以下の図のよう,のサイズで作ります%E3%80%82 */}
          {/* https://stackoverflow.com/questions/61263669/does-material-ui-have-an-image-component */}
          <Box
            component="img"
            sx={{
              aspectRatio: { xs: 2560 / 423 },
              width: "100%",
              objectFit: "cover",
              borderRadius: 4,
            }}
            alt="Header Image"
            src={profile.header_image}
          />

          <TeamHeader
            team_name={profile.team_name}
            user_name={profile.user_name}
            avatar_img={profile.avatar_image}
            description={profile.description}
            socials={profile.socials}
            key={"team_header"}
          />

          {projectId !== null ? (
            <ProjectDetail
              project={projectsData.projects.find((p: ProjectData) => p.id === projectId)}
              works={worksData.works.filter((w: WorkData) => w.project_id === projectId)}
            />
          ) : (
          <MyTabs
            key={"my_tabs"}
            items={[
              {
                icon: <AccountTreeIcon fontSize="small" />,
                label: "Projects",
                content: (
                  <ProjectTab
                    projects={projectsData.projects}
                    works={worksData.works}
                  />
                ),
              },
              {
                icon: <CollectionsIcon fontSize="small" />,
                label: "Prototypes",
                content: (
                  <ProtoPediaList prototypes={protopediaData.prototypes} />
                ),
              },
              {
                icon: <EventIcon fontSize="small" />,
                label: "Exhibitions",
                content: (
                  <ExhibitionTimeline prototypes={protopediaData.prototypes} />
                ),
              },
              {
                icon: <QueryStatsIcon fontSize="small" />,
                label: "Stats",
                content: <StatsTab prototypes={protopediaData.prototypes} />,
              },
              {
                icon: <HubIcon fontSize="small" />,
                label: "Networks",
                content: (
                  <NetworkTab
                    prototypes={protopediaData.prototypes}
                    palette={theme.palette}
                  />
                ),
              },
            ]}
          />
          )}
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
