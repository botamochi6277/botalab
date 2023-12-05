// mui
import {
  Card, CardContent, CardMedia, CardActionArea,
  Link,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

// assets
import prototypes from "./assets/prototypes.json";

const ProtoTypeCard = (props: {
  name: string,
  prototype_id: number,
  img: string,
  summary: string
}) => {
  // https://stackoverflow.com/questions/57818778/how-to-make-material-ui-cardactions-always-stick-to-the-bottom-of-parent
  // https://stackoverflow.com/questions/55824260/same-height-cards-in-material-ui
  return (
    <Card sx={{ flexDirection: "column", height: "100%" }} key={props.prototype_id}>
      <CardActionArea
        component={Link}
        href={`https://protopedia.net/prototype/${props.prototype_id}`}
        target="_blank"
        rel="noopener"
      >
        <CardMedia
          component="img"
          sx={{ height: 240, maxWidth: 600 }}
          image={props.img}
          alt="Live from space album cover"
        />
        <CardContent >
          <Typography component="div" variant="h5">
            {props.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {props.summary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function ProtoPediaList() {
  const items = prototypes.prototypes.map(
    p => {
      const ss = p.images[0].split("/");
      const img_path = `./prototypes/${ss[ss.length - 1]}`;
      return (<ProtoTypeCard
        name={p.name} prototype_id={p.prototype_id}
        img={img_path} summary={p.summary} key={p.prototype_id}
      />)
    }
  )

  return (
    <Grid container spacing={2}>
      {items.map((item, idx) => <Grid xs={6} sm={4} md={3} key={idx}>{item}</Grid>)}
    </Grid>
  )
}

