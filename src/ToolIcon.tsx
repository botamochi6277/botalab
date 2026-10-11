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
  "Arduino IDE": "arduino",
  "Adventurer 3": "flashforge",
  "ROS(Robot Operating System)": "ros",
  "Bambu Lab P1S": "bambulab",
  "Web Bluetooth API": "bluetooth",
};

export const toolIconFile = (tool: string) => toolIcons[tool];

// Simple Icons files in public/materials
const materialIcons: Record<string, string> = {
  M5Stack: "m5stack",
  "M5Stack Core2": "m5stack",
  "M5Stack Atomic Motion Base": "m5stack",
  M5StackChan: "m5stack",
  "M5ATOM Lite": "m5stack",
  "Raspberry Pi": "raspberrypi",
  NeoPixel: "adafruit",
};

export const materialIconFile = (material: string) => materialIcons[material];

// The SVG is used as a mask so that it follows the chip's text color in light/dark themes.
export const ToolIcon = (props: {
  file: string;
  dir?: "tools" | "materials";
}) => {
  const url = `url(/${props.dir ?? "tools"}/${props.file}.svg)`;
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
