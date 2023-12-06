import * as React from 'react';
import {
  Box,
  Tab
} from '@mui/material';
import {
  TabContext,
  TabList,
  TabPanel
} from '@mui/lab';

{/* https://mui.com/material-ui/react-tabs/ */ }
interface TabPropItem {
  label?: string
  content?: JSX.Element
}
export default function MyTabs(
  props: {
    items?: TabPropItem[]
  }

) {
  const [tab_id, setTabId] = React.useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabId(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tab_id}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {props.items?.map((item, idx) => <Tab label={item.label} key={`tab-${item.label}`} value={`${idx}`} />)}
          </TabList>
        </Box>
        {props.items?.map((item, idx) => <TabPanel value={`${idx}`}>{item.content}</TabPanel>)}
      </TabContext>
    </Box>
  );
}