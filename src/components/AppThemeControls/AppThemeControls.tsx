// Add commentary to this file

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
  // useColorMode is a hook provided by Chakra UI that gives us access to the current color mode and methods to change it. toggleColorMode is a function that toggles the color mode between light and dark. setColorMode is a function that sets the color mode to a specific value. We need to use both for this, because the manual toggle will trigger toggleColorMode, and the system theme change will trigger setColorMode when the checkbox for "Follow System Theme" is checked.
  // Note that toggleColorMode and setColorMode are functions that are provided by useColorMode, so we don't need to define them ourselves.
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();

  // Check to see if the system theme should be followed.
  // followSystemTheme is a state variable that keeps track of whether the user has chosen to follow the system theme. setFollowSystemTheme is a function that updates the value of followSystemTheme.
  const [followSystemTheme, setFollowSystemTheme] = useState(
    // The value of followSystemTheme is determined by the value of the "follow-system-theme" key in localStorage. If the key does not exist, the value is set to false. If the value does exist, it is parsed as a boolean.
    localStorage.getItem("follow-system-theme") === "true" || false
  );
  // If the value of followSystemTheme changes, the new value is stored in localStorage under the key "follow-system-theme".
  localStorage.setItem("follow-system-theme", String(followSystemTheme));

  // useEffect is a hook that allows us to perform side effects in function components. In this case, we are using it to listen for changes to the system theme and update the color mode accordingly.
  useEffect(() => {
    // Define the function that will handle the system theme change when the system theme changes.
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const newMode = event.matches ? "dark" : "light";
      setColorMode(newMode);
    };

    // Define the conditions that must be met in order to run handleSystemThemeChange and pass "light" or "dark" to setColorMode so that handleSystemThemeChange can trigger setColorMode using the appropriate value passed in. Also return a function to clean up the event listener. Always clean up after yourself.
    if (followSystemTheme) {
      const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
      systemDarkMode.addEventListener("change", handleSystemThemeChange);
      setColorMode(systemDarkMode.matches ? "dark" : "light");
      return () => {
        systemDarkMode.removeEventListener("change", handleSystemThemeChange);
      };
    }
  });

  // Define the function that will toggle the system theme. When the user toggles the "Follow System Theme" checkbox, this function will be called. It will toggle the value of followSystemTheme and store the new value in localStorage under the key "follow-system-theme".
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
