import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theming/theme";
import App from "./App";
import "./assets/styles/index.css";

{
  /* This was built with the assistance of an online tutorial video series. Read through the code by jumping to the definitions of things in the order they appear. Use jump to definition on the imports when something like a hook, service, theme, or other file that isn't a component is relevant to the Component being viewed. For example, theming/theme is relevant to Component/AppThemeControls. */
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Wrap app in ChakraProvider to use Chakra  */}
    <ChakraProvider theme={theme}>
      {/* Put ColorModeScript before App loads */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </StrictMode>
);
