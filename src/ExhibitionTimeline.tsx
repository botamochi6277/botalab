import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Icon, Link, Typography } from '@mui/material';


import exhibitions from './assets/exhibitions.json';

export default function ExhibitionTimeline() {

  const items = exhibitions.exhibitions
  // sort
  items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const exhibitionName = (name: string, link: string) => {
    if (link.length > 0) {
      return (<Link href={link} target="_blank" underline="hover">
        <Typography variant="h6" component="span">
          {name}
        </Typography >
      </Link >)
    }

    return (
      <Typography variant="h6" component="span">
        {name}
      </Typography>
    )
  }

  // console.log()

  const tl_items = items.reverse().map(item => (
    <TimelineItem key={item.name}>
      <TimelineOppositeContent
        sx={{ m: 'auto 0', display: { xs: "none", sm: "block" } }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {item.date}{item?.period}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot color={((new Date(item.date).getTime() - new Date().getTime()) > 0) ? "success" : "primary"}>
          <Icon>{item.icon}</Icon>
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '12px', px: 2 }}>
        {exhibitionName(item.name, item.link)}
        <Typography>{item.location}</Typography>
      </TimelineContent>
    </TimelineItem>))

  return (
    <Timeline>
      {tl_items}
    </Timeline>
  );
}