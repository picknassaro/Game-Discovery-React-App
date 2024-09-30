import {
  VStack,
  HStack,
  Switch,
  Text,
  useColorMode,
  Checkbox,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const AppThemeControls = () => {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();

  const [followSystemTheme, setFollowSystemTheme] = useState(
    localStorage.getItem("follow-system-theme") === "true" || false
  );
  localStorage.setItem("follow-system-theme", String(followSystemTheme));

  useEffect(() => {
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const newMode = event.matches ? "dark" : "light";
      setColorMode(newMode);
    };

    if (followSystemTheme) {
      const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
      systemDarkMode.addEventListener("change", handleSystemThemeChange);
      setColorMode(systemDarkMode.matches ? "dark" : "light");
      return () => {
        systemDarkMode.removeEventListener("change", handleSystemThemeChange);
      };
    }
  });

  const toggleSystemTheme = () => {
    setFollowSystemTheme(!followSystemTheme);
    localStorage.setItem("follow-system-theme", String(!followSystemTheme));
  };

  return (
    <VStack alignItems="end">
      <HStack>
        <Checkbox
          colorScheme="green"
          isChecked={followSystemTheme}
          onChange={toggleSystemTheme}
        />
        <Text>Follow System Theme</Text>
      </HStack>
      <HStack>
        {!followSystemTheme && (
          <>
            <Switch
              colorScheme="green"
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
            />
            <Text>Dark Mode</Text>
          </>
        )}
      </HStack>
    </VStack>
  );
};

export default AppThemeControls;
