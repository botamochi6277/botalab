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
} from "@mui/material";

import exhibitions from "./assets/exhibitions.json";

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

  const tl_items = items.reverse().map((item) => (
    <TimelineItem key={item.name}>
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
            <Avatar src={item.icon} sx={{ width: 36, height: 36 }} />
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
                sx={{ width: 48, height: 48 }}
              />
            ))}
          </AvatarGroup>
        </Box>
      </TimelineContent>
    </TimelineItem>
  ));

  return <Timeline>{tl_items}</Timeline>;
}
