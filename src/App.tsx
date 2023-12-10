import * as React from 'react';
import {
  Container,
  Box,
  createTheme, ThemeProvider, CssBaseline, Stack
} from '@mui/material';


// custom
import ProtoPediaList from './ProtoPediaList';
import MyAppBar from './MyAppBar';
import TeamHeader from './TeamHeader';
import ExhibitionTimeline from './ExhibitionTimeline';
import MyTabs from './MyTabs';

// assets
import profile from './assets/profile.json'


function App() {
  const [theme, setTheme] = React.useState(
    createTheme({
      palette: {
        mode: 'dark',
      },
    })
  );
  const toggleTheme = (theme: any) => {
    if (theme.palette.mode === 'dark') {
      setTheme(createTheme({ palette: { mode: 'light', }, }))
    } else {
      setTheme(createTheme({ palette: { mode: 'dark', }, }))
    }
  }

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
              aspectRatio: { xs: 1546 / 423, md: 1855 / 423, lg: 2560 / 423 },
              width: "100%",
              objectFit: "cover",
              borderRadius: 4
            }}
            alt="Channel Art"
            src={profile.header_image}
          />

          <TeamHeader
            team_name={profile.team_name}
            user_name={profile.user_name}
            avatar_img={profile.avatar_image}
            description={profile.description}
            socials={profile.socials}
          />

          <MyTabs items={[
            { label: "ProtoPedia Works", content: <ProtoPediaList /> },
            { label: "Exhibition Timeline", content: <ExhibitionTimeline /> }]}
          />
        </Stack>
      </Container>
    </ThemeProvider>
  )
}

export default App
