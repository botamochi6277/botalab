// header like youtube channel
import {
  Typography, Stack,
  Card,
  CardContent,
  CardActions,
  Box,
  Chip
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

// icons
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import ArticleIcon from '@mui/icons-material/Article';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import HexagonIcon from '@mui/icons-material/Hexagon';

export default function CircleHead(props: { title: string, subtitle: string, img: string, description: string | undefined }) {
  const social_items = [
    { name: "GitHub", to: 'https://github.com/botamochi6277', icon: <GitHubIcon /> },
    { name: "twitter", to: "https://twitter.com/botamochi6277", icon: <TwitterIcon /> },
    { name: "Zenn", to: "https://zenn.dev/botamochi6277", icon: <ArticleIcon /> },
    { name: "GRABCAD", to: "https://grabcad.com/botamochi-1", icon: <ViewInArIcon /> },
    { name: "Thingiverse", to: "https://www.thingiverse.com/botamochi/designs", icon: <HexagonIcon /> },
  ]
  // https://m3.material.io/components/chips/guidelines
  return (
    <Card >
      <Grid container spacing={2}>
        <Grid xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Box
            component="img"
            sx={{
              aspectRatio: 1,
              width: { xs: 140, sm: 200 },
              objectFit: "cover",
              borderRadius: "50%"
            }}
            alt="Channel Art"
            src={props.img}
          />
        </Grid>
        <Grid xs={8}>
          <CardContent>
            <Typography component="div" variant="h3">
              {props.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {props.subtitle}
            </Typography>
            {/* badges */}
            <Typography>
              {props.description}
            </Typography>
          </CardContent>

          <CardActions>

            <Stack direction={"row"} spacing={1} useFlexGap flexWrap="wrap">
              {social_items.map(item => (
                <Chip
                  icon={item.icon}
                  label={item.name}
                  key={item.name}

                  component="a"
                  href={item.to}
                  target="_blank"
                  rel="noopener"
                  clickable
                />

              ))}
            </Stack>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}