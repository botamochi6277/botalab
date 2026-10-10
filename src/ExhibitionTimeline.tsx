import type * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Icon,
  Link,
  Typography,
  Avatar,
  AvatarGroup,
  Box,
  Chip,
} from "@mui/material";

import exhibitions from "./assets/exhibitions.json";
import worksData from "./assets/works.yml";

// bare file names live in public/works; URLs are used as is
const workImage = (img?: string) =>
  img && !/^(https?:)?\/\//.test(img) && !img.startsWith("/")
    ? `/works/${img}`
    : img;

export default function ExhibitionTimeline(props: {
  prototypes?: PrototypeV2Data[];
}) {
  const items = exhibitions.exhibitions;
  // sort
  items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const exhibitionName = (name: string, link: string) => {
    if (link.length > 0) {
      return (
        <Link href={link} target="_blank" underline="hover">
          <Typography variant="h6" component="span">
            {name}
          </Typography>
        </Link>
      );
    }

    return (
      <Typography variant="h6" component="span">
        {name}
      </Typography>
    );
  };

  const getWorksByIds = (ids: number[]) => {
    if (!props.prototypes) return [];
    return props.prototypes.filter((p) => ids.includes(p.id));
  };

  const getWorksByWorkIds = (ids: string[]) =>
    worksData.works.filter((w: WorkData) => ids.includes(w.id));

  const yearOf = (date: string) => new Date(date).getFullYear();
  const yearId = (year: number) => `exhibition-year-${year}`;

  const tl_items = items.reverse().map((item, i) => (
    <TimelineItem
      key={item.name}
      id={
        i === 0 || yearOf(items[i - 1].date) !== yearOf(item.date)
          ? yearId(yearOf(item.date))
          : undefined
      }
      sx={{ scrollMarginTop: 16 }}
    >
      <TimelineOppositeContent
        sx={{ m: "auto 0", display: { xs: "none", sm: "block" } }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {item.date}
        {item?.period}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot
          color={
            new Date(item.date).getTime() - new Date().getTime() > 0
              ? "success"
              : "primary"
          }
        >
          {item.icon.includes(".png") ||
          item.icon.includes(".svg") ||
          item.icon.includes(".jpg") ? (
            <Box
              component="img"
              src={`/exhibitions/${item.icon}`}
              sx={{ width: 36, height: 36, borderRadius: 8 }}
            />
          ) : (
            <Avatar sx={{ width: 36, height: 36, bgcolor: "transparent" }}>
              <Icon>{item.icon}</Icon>
            </Avatar>
          )}
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        {exhibitionName(item.name, item.link)}
        <Typography>{item.location}</Typography>
        <Box sx={{ display: "flex", justifyContent: "left", marginTop: 1 }}>
          <AvatarGroup max={4} spacing="medium">
            {getWorksByIds(item.prototype_ids || []).map((work) => (
              <Avatar
                key={`${item.name}-${work.id}`}
                alt={work.name}
                src={work.mainImage}
                sx={{ width: 36, height: 36 }}
              />
            ))}
            {getWorksByWorkIds(
              (item as { work_ids?: string[] }).work_ids || [],
            ).map((work: WorkData) => (
              <Avatar
                key={`${item.name}-${work.id}`}
                alt={work.name}
                src={workImage(work.mainImage)}
                sx={{ width: 36, height: 36 }}
              />
            ))}
          </AvatarGroup>
        </Box>
      </TimelineContent>
    </TimelineItem>
  ));

  // newest first: the first item of each year is the anchor for its chip
  const years = [...new Set(items.map((item) => yearOf(item.date)))];

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2, mb: 1 }}>
        {years.map((year) => (
          <Chip
            key={year}
            label={year}
            color="primary"
            variant="outlined"
            component="a"
            href={`#${yearId(year)}`}
            clickable
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              document
                .getElementById(yearId(year))
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        ))}
      </Box>
      <Timeline>{tl_items}</Timeline>
    </Box>
  );
}
