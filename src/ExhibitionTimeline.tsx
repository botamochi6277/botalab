import * as React from 'react';
import { Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Icon from '@mui/material/Icon';
export default function ExhibitionTimeline() {

  const items = [
    { name: "NT Nagoya 2023", date: "2023-11-18,19", locate: "Y-store", icon: "star" },
    { name: "NT Tokyo 2023", date: "2023-11-04,05", locate: "Tokyo Science", icon: "add_circle" },
    { name: "NT Kanazawa 2023", date: "2023-06-17,18", locate: "Kanazawa station", icon: "add_circle" }
  ]

  const tl_items = items.map(item => (
    <TimelineItem key={item.name}>
      <TimelineOppositeContent
        sx={{ m: 'auto 0' }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {item.date}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot color="primary">
          <Icon>{item.icon}</Icon>
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '12px', px: 2 }}>
        <Typography variant="h6" component="span">
          {item.name}
        </Typography>
        <Typography>{item.locate}</Typography>
      </TimelineContent>
    </TimelineItem>))

  return (
    <Timeline>
      {tl_items}
    </Timeline>
  );
}