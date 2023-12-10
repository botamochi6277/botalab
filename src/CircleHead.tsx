// header like youtube channel
import {
  Typography, Stack,
  Card,
  CardContent,
  CardActions,
  Box, Link
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';


export default function CircleHead(props: { title: string, subtitle: string, img: string, description: string | undefined }) {
  const social_items = [
    { name: "GitHub", to: 'https://github.com/botamochi6277', badge: "https://img.shields.io/badge/GitHub-grey?style=for-the-badge&logo=github" },
    { name: "twitter", to: "https://twitter.com/botamochi6277", badge: "https://img.shields.io/badge/Twitter-grey?style=for-the-badge&logo=twitter" },
    { name: "Zenn", to: "https://zenn.dev/botamochi6277", badge: "https://img.shields.io/badge/Zenn-grey?style=for-the-badge&logo=zenn" },
    { name: "GRABCAD", to: "https://grabcad.com/botamochi-1", badge: "https://img.shields.io/badge/GrabCad-grey?style=for-the-badge&logo=grabcad" },
    { name: "Thingiverse", to: "https://www.thingiverse.com/botamochi/designs", badge: "https://img.shields.io/badge/Thingiverse-grey?style=for-the-badge&logo=thingiverse" },
  ]
  // https://m3.material.io/components/chips/guidelines
  return (
    <Card >
      <Grid container spacing={2}>
        <Grid xs={0} sm={4}
          sx={{
            display: { xs: "none", sm: "flex" },
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
        <Grid xs={12} sm={8}>
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
                <Link
                  component="a"
                  href={item.to}
                  target="_blank"
                  rel="noopener"
                >
                  <Box
                    component="img"
                    sx={{
                      // height: { xs: 24, sm: 24 },
                      objectFit: "cover",
                      bgcolor: 'primary.main',
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                    alt="Badge"
                    src={item.badge}
                    key={item.name}
                  />
                </Link>

              ))}
            </Stack>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}