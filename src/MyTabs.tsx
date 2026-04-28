import { Box, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { ReactNode } from "react";

{
  /* https://mui.com/material-ui/react-tabs/ */
}
interface TabPropItem {
  icon?: string | React.ReactElement<unknown>;
  label?: string;
  content?: ReactNode;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function MyTabs(props: { items?: TabPropItem[] }) {
  const [tab_id, setTabId] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabId(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          value={tab_id}
          allowScrollButtonsMobile
        >
          {props.items?.map((item, idx) => (
            <Tab
              id={`simple-tab-${idx}`}
              aria-controls={`simple-tabpanel-${idx}`}
              icon={item.icon}
              label={item.label}
              key={`tab-${item.label}`}
              value={idx}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>
      {props.items?.map((item, idx) => (
        <CustomTabPanel value={tab_id} index={idx}>
          {item.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
