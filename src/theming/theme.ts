import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  // Do not set useSystemColorMode at all, because there's no easy way in Chakra UI to use both a system color mode toggle and a toggle button. It's probably possible, I just couldn't figure it out. Maybe I could have exported a const from Component/AppThemeControls and imported it here, but I'm not sure. See Component/AppThemeControls for more information on how a Follow System Color Mode toggle was implemented.
};

// Another thing this file can be used for is customizing the default css inscluded with Chakra UI. Here, we will define the breakpoints manually. We have copied the default breakpoints from Chakra UI's docs and added a "2xl" breakpoint.
const breakpoints = {
  base: "0em", //0px @font-size 16px
  sm: "30em", //480px @font-size 16px
  md: "48em", //768px @font-size 16px
  lg: "62em", //992px @font-size 16px
  xl: "80em", //1280px @font-size 16px
  "2xl": "96em", //1536px @font-size 16px
};

const theme = extendTheme({ config, breakpoints });

export default theme;
