import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  // Do not set useSystemColorMode at all, because there's no easy way in Chakra UI to use both a system color mode toggle and a toggle button. It's probably possible, I just couldn't figure it out. Maybe I could have exported a const from Component/AppThemeControls and imported it here, but I'm not sure. See Component/AppThemeControls for more information on how a Follow System Color Mode toggle was implemented.
};

const theme = extendTheme({ config });

export default theme;
