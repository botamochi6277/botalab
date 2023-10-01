import * as React from 'react';
import {
  Container,
  Button,
  createTheme, ThemeProvider, CssBaseline
} from '@mui/material';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import ProtoPediaCarousel from './ProtoPediaCarousel'


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


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <h1>BotaLab</h1>
        <h2>ProtoPedia Works</h2>
        <ProtoPediaCarousel />

        {/* Zenn */}
        {/* Twitter */}
        {/* GrabCad */}
        {/* Thingiverse */}
        {/* Vrm Hub */}
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
