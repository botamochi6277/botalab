import { Box } from "@mui/material";

// Simple Icons (https://simpleicons.org/) files in public/tools
const toolIcons: Record<string, string> = {
  PlatformIO: "platformio",
  Blender: "blender",
  Fusion360: "autodesk",
  "Slicer for Fusion360": "autodesk",
  "Autodesk Eagle": "eagle",
  MUI: "mui",
  React: "react",
  Unity: "unity",
  Arduino: "arduino",
  "ROS(Robot Operating System)": "ros",
  "Bambu Lab P1S": "bambulab",
  "Web Bluetooth API": "bluetooth",
};

export const toolIconFile = (tool: string) => toolIcons[tool];

// The SVG is used as a mask so that it follows the chip's text color in light/dark themes.
export const ToolIcon = (props: { file: string }) => {
  const url = `url(/tools/${props.file}.svg)`;
  return (
    <Box
      component="span"
      sx={{
        width: 16,
        height: 16,
        ml: "6px !important",
        mr: "-4px !important",
        bgcolor: "currentColor",
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
};
