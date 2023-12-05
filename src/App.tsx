import * as React from 'react';
import {
  Container,
  Button,
  Box,
  CardMedia,
  createTheme, ThemeProvider, CssBaseline, Typography, Tab
} from '@mui/material';

// icons
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// custom
import ProtoPediaCarousel from './ProtoPediaCarousel'
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
        <CardMedia component="img" image='https://dummyimage.com/2560x263/2b2b2b/f7f7f7&text=dummy_banner'>
        </CardMedia>

        <CircleHead
          title='BotaLab'
          subtitle='@botamochi6277'
          img='https://dummyimage.com/256x256/2b2bff/f7f7f7&text=B'
          description={"趣味でメイカーとして活動しているbotamochiです. イベントでは個人サークルのBotaLabとして出展しています."}
        />

        <MyTabs items={[
          { label: "ProtoPedia Works", content: <ProtoPediaCarousel /> },
          { label: "ExhibitionTimeline", content: <ExhibitionTimeline /> },
          { label: "Test", content: <Typography >Hello Tab</Typography> }]}
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
