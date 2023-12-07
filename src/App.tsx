import * as React from 'react';
import {
  Container,
  Button,
  Box,
  CardMedia,
  createTheme, ThemeProvider, CssBaseline, Typography
} from '@mui/material';

// icons
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// custom
import ProtoPediaList from './ProtoPediaList';
import MyAppBar from './MyAppBar';
import CircleHead from './CircleHead';
import ExhibitionTimeline from './ExhibitionTimeline';
import MyTabs from './MyTabs';

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
        <MyAppBar />
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
          src='https://github.com/botamochi6277/botalab/assets/14128408/370721be-1e7a-4a28-b45c-0b44ff3ff4db'
        />

        <CircleHead
          title='BotaLab'
          subtitle='@botamochi6277'
          img='https://avatars.githubusercontent.com/u/14128408?v=4'
          description={"趣味でメイカーとして活動しているbotamochiです. イベントでは個人サークルのBotaLabとして出展しています."}
        />

        <MyTabs items={[
          { label: "ProtoPedia Works", content: <ProtoPediaList /> },
          { label: "Exhibition Timeline", content: <ExhibitionTimeline /> }]}
        />

        <Button
          startIcon={theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          variant="outlined"
          color="secondary"
          onClick={() => toggleTheme(theme)}
          fullWidth
        >
          {theme.palette.mode} mode
        </Button>
      </Container>
    </ThemeProvider>
  )
}

export default App
