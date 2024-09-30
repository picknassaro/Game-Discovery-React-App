import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const breakpoints = {
  base: "0px",
  sm: "320px",
  md: "640px",
  lg: "970px",
  "lg+": "1100px",
  xl: "1280px",
  "2xl": "1600px",
};

const theme = extendTheme({ config, breakpoints });

export default theme;
