import { AppBar, Container, Toolbar, Typography, Link, IconButton } from "@mui/material";

// icons
import GitHubIcon from '@mui/icons-material/GitHub';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import TwitterIcon from '@mui/icons-material/Twitter';

const MyAppBar = () => {

  const icon_items = [
    { name: "github", to: 'https://github.com/botamochi6277', icon: <GitHubIcon /> },
    { name: "twitter", to: "https://twitter.com/botamochi6277", icon: <TwitterIcon /> }
  ]
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ArchitectureIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', sm: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BotaLab
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          {/* <Link color="inherit" href='https://github.com/botamochi6277' target='_blank' rel="noopener">
            <GitHubIcon />
          </Link> */}
          {icon_items.map(item => (
            <IconButton
              component={Link}
              href={item.to}
              target="_blank"
              rel="noopener"
              sx={{ color: 'inherit' }}
              key={item.name}
            >
              {item.icon}
            </IconButton>
          ))}
        </Toolbar></Container></AppBar>
  )
}

export default MyAppBar;