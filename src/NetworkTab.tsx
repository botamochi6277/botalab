import * as React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Palette,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

type LayoutName = "random" | "circle" | "concentric" | "grid" | "cose";

import CytoscapeComponent from "react-cytoscapejs";

const MaterialTagNetwork = (props: {
  prototypes: PrototypeV2Data[];
  palette: Palette;
}) => {
  const [layout, setLayout] = React.useState<LayoutName>("cose");

  // materials and tags
  const allKeywords = props.prototypes.reduce((prev, next) => {
    var tags = next.tags ? next.tags.map((t) => `#${t}`) : [];
    var materials = next.materials ?? [];

    return prev.concat(tags.concat(materials));
  }, [] as string[]);
  const uniqueKeywords = Array.from(new Set(allKeywords));
  const keywordNodes = uniqueKeywords.map((keyword) => {
    return {
      data: { id: keyword, name: keyword.split("@")[0] },
      classes: keyword[0] === "#" ? "tag" : "material",
    };
  });
  const nodes = props.prototypes.map((prototype) => {
    return {
      data: { id: prototype.id, name: prototype.name },
      classes: "prototype",
      // position: { x: idx * 20, y: idx * 5 },
    };
  }) as any[];

  const edges = props.prototypes.reduce((prev, next) => {
    var tags = next.tags ? next.tags.map((t) => `#${t}`) : [];
    var materials = next.materials ?? [];
    const tmp = materials.concat(tags);
    if (!tmp) {
      return prev;
    }

    const tmpEdges = tmp.map((p) => {
      return {
        data: { source: p, target: next.id },
      };
    });

    return prev.concat(tmpEdges);
  }, [] as any[]);

  const elements = nodes.concat(keywordNodes).concat(edges);

  // https://github.com/cytoscape/cytoscape.js/tree/master/documentation/demos/images-breadthfirst-layout
  const nodeStyle = props.prototypes.map((prototype) => {
    const ss = prototype.mainImage?.split("/");
    const img_path = ss ? `./prototypes/${ss[ss.length - 1]}` : null;
    return {
      selector: `#${prototype.id}`,
      css: {
        backgroundImage: img_path,
        backgroundFit: "cover",
        height: 80,
        width: 80,
      },
    };
  });

  // network stylesheet
  const stylesheet = [
    {
      selector: ".material",
      css: {
        content: "data(name)",
        "text-valign": "center",
        color: props.palette.text.primary,
        "text-outline-width": 2,
        "text-outline-color": props.palette.primary.dark,
        "background-color": props.palette.primary.dark,
      },
    },
    {
      selector: ".tag",
      css: {
        content: "data(name)",
        "text-valign": "center",
        color: props.palette.text.secondary,
        "text-outline-width": 2,
        "text-outline-color": props.palette.secondary.dark,
        "background-color": props.palette.secondary.dark,
      },
    },
    {
      selector: ".prototype:active",
      css: {
        "background-color": props.palette.primary.dark,
        "text-outline-width": 2,
        "text-outline-color": props.palette.primary.dark,
        "outline-width": 2,
        color: "white",
        content: "data(name)",
        "text-valign": "top",
      },
    },
  ].concat(nodeStyle as any[]) as cytoscape.StylesheetCSS[];
  // https://js.cytoscape.org/#layouts

  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h6">
          Material and Tag Network
        </Typography>
        <Box sx={{ border: 2, borderColor: "secondary" }}>
          <CytoscapeComponent
            elements={elements}
            style={{ height: "400px" }}
            stylesheet={stylesheet}
            layout={{ name: layout }}
          />
        </Box>
      </CardContent>
      <CardActions>
        <TextField
          id="filled-select-layout"
          select
          label="Layout"
          variant="outlined"
          value={layout}
          onChange={(ev) => setLayout(ev.target.value as LayoutName)}
        >
          {["random", "circle", "concentric", "grid", "cose"].map((s) => (
            <MenuItem key={`layout-select-${s}`} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
      </CardActions>
    </Card>
  );

  // NOTE compound: grouping with parents
};

const NetworkTab = (props: {
  prototypes: PrototypeV2Data[];
  palette: Palette;
}) => {
  return (
    <Box>
      <Stack direction={"column"} spacing={1}>
        <MaterialTagNetwork
          prototypes={props.prototypes}
          palette={props.palette}
        />
      </Stack>
    </Box>
  );
};

export default NetworkTab;
