// import * as React from "react";
// mui
import { Card, CardContent, Typography, Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";

// local data
import exhibitionsData from "./assets/exhibitions.json";

const PublishedTrendChartCard = (props: { prototypes: PrototypeV2Data[] }) => {
  const createdYears = props.prototypes.map((obj) => {
    const date = new Date(obj.createDate);
    return date.getFullYear();
  });

  //   count year https://qiita.com/saka212/items/408bb17dddefc09004c8
  //   const count = createdYears.reduce(function (prev, current) {
  //     prev[current] = (prev[current] || 0) + 1;
  //     return prev;
  //   }, {});

  const minYear = 2019; // NOTE: to align with event chart
  const maxYear = new Date().getFullYear(); // current year

  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, idx) => minYear + idx,
  );
  const counts = years.map((year) => {
    return createdYears.filter((y) => y === year).length;
  });
  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h6">
          Publication trends
        </Typography>
        <Typography variant="caption" color="text.secondary">
          The number of prototypes published to ProtoPedia each year. Note that
          the data for the current year may be incomplete.
        </Typography>
        <LineChart
          xAxis={[
            {
              data: years,
              label: "years",
              tickLabelInterval: (y, _) => years.includes(y),
              valueFormatter: (value: number) => value.toString(),
              height: 60,
            },
          ]}
          yAxis={[{ label: "#published" }]}
          series={[
            {
              curve: "linear",
              data: counts,
              showMark: true,
            },
          ]}
          height={200}
        />
      </CardContent>
    </Card>
  );
};

const EventTrendChartCard = () => {
  const exhibitions = exhibitionsData.exhibitions;
  const eventYears = exhibitions.map((obj) => {
    const date = new Date(obj.date);
    return date.getFullYear();
  });

  //   count year https://qiita.com/saka212/items/408bb17dddefc09004c8
  //   const count = eventYears.reduce(function (prev, current) {
  //     prev[current] = (prev[current] || 0) + 1;
  //     return prev;
  //   }, {});

  const minYear = Math.min(...eventYears);
  const maxYear = Math.max(...eventYears);

  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, idx) => minYear + idx,
  );

  const counts = years.map((year) => {
    return eventYears.filter((y) => y === year).length;
  });

  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h6">
          Event trends
        </Typography>
        <LineChart
          xAxis={[
            {
              data: years,
              label: "years",
              tickLabelInterval: (y, _) => years.includes(y),
              valueFormatter: (value: number) => value.toString(),
              height: 60,
            },
          ]}
          yAxis={[{ label: "#events" }]}
          series={[
            {
              curve: "linear",
              data: counts,
              showMark: true,
            },
          ]}
          height={200}
        />
      </CardContent>
    </Card>
  );
};

const MaterialsCard = (props: {
  prototypes: PrototypeV2Data[];
  target: "material" | "tag";
  minCounts?: number;
}) => {
  const getter = (p: PrototypeV2Data) => {
    if (props.target === "material") {
      return p.materials;
    } else {
      // tags
      return p.tags;
    }
  };
  // num. of materials
  const allMaterials = props.prototypes.reduce((prev, next) => {
    if (!getter(next)) {
      return prev;
    }

    return prev.concat(getter(next) ?? []);
  }, [] as string[]);

  const uniqueMaterials = Array.from(new Set(allMaterials));
  const minCounts = props.minCounts ?? 10;

  const materialCount = uniqueMaterials.map(
    (mat) => allMaterials.filter((m) => m === mat).length,
  );

  const tmpItems = uniqueMaterials.map((mat, idx) => {
    return {
      name: mat,
      counts: materialCount[idx],
    };
  });

  const plotItems = tmpItems
    .filter((item) => item.counts >= minCounts)
    .sort((a, b) => b.counts - a.counts);

  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h6">
          {`${props.target[0].toUpperCase()}${props.target.slice(1)}s`}
        </Typography>
        <BarChart
          height={300}
          series={[
            {
              data: plotItems.map((item) => item.counts),
            },
          ]}
          xAxis={[
            {
              tickLabelInterval: (value, _) => {
                return value % 1 === 0;
              },
              valueFormatter: (value: number) => value.toFixed(0),
              label: `#${props.target}s`,
              height: 60,
            },
          ]}
          yAxis={[
            {
              data: plotItems.map((item) => item.name),
              scaleType: "band",
              width: 120,
            },
          ]}
          layout="horizontal"
          grid={{ vertical: true }}
        />
      </CardContent>
    </Card>
  );
};

const StatsTab = (props: { prototypes: PrototypeV2Data[] }) => {
  return (
    <Box>
      <PublishedTrendChartCard prototypes={props.prototypes} />
      <EventTrendChartCard />
      <MaterialsCard
        prototypes={props.prototypes}
        target="material"
        minCounts={2}
      />
      <MaterialsCard prototypes={props.prototypes} target="tag" minCounts={2} />
    </Box>
  );
};

export default StatsTab;
