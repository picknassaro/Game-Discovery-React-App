import { useState, useEffect } from "react";
import { VStack, HStack, Checkbox, Switch, Text } from "@chakra-ui/react";

const AppThemeControls = () => {
  const [followSystemTheme, setFollowSystemTheme] = useState(() => {
    const storedValue = localStorage.getItem("follow-system-theme");
    const initialValue = storedValue === "true" || false;
    if (!initialValue) {
      localStorage.setItem("follow-system-theme", "false");
    }
    return initialValue;
  });
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("chakra-ui-color-mode") === "dark" || false
  );

  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newMode = e.matches ? "dark" : "light";
      switchColorMode(newMode);
    };

    if (followSystemTheme) {
      const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
      systemDarkMode.addEventListener("change", handleSystemThemeChange);
      switchColorMode(systemDarkMode.matches ? "dark" : "light");
      return () => {
        systemDarkMode.removeEventListener("change", handleSystemThemeChange);
      };
    }
  });

  const switchColorMode = (newMode: "light" | "dark") => {
    const html = document.documentElement;
    const body = document.body;
    const oldMode = isDarkMode ? "dark" : "light";

    const updatedTheme = (html.getAttribute("data-theme") || "")
      .replace(/\b(light|dark)\b/g, "")
      .trim();
    html.setAttribute("data-theme", `${updatedTheme} ${newMode}`.trim());

    const updatedStyle = (html.getAttribute("style") || "")
      .replace(/color-scheme:\s*(light|dark);?/g, "")
      .trim();
    html.setAttribute(
      "style",
      `${updatedStyle} color-scheme: ${newMode};`.trim()
    );

    body.classList.replace(`chakra-ui-${oldMode}`, `chakra-ui-${newMode}`);

    setIsDarkMode(newMode === "dark");

    localStorage.setItem("chakra-ui-color-mode", newMode);
  };

  const switchFollowSystemTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFollowSystemTheme(e.target.checked);
    localStorage.setItem("follow-system-theme", e.target.checked.toString());
  };

  return (
    <VStack alignItems="end">
      <HStack>
        <Checkbox
          colorScheme="green"
          isChecked={followSystemTheme}
          onChange={switchFollowSystemTheme}
        />
        <Text>Follow System Theme</Text>
      </HStack>
      <HStack>
        {!followSystemTheme && (
          <>
            <Switch
              colorScheme="green"
              isChecked={isDarkMode}
              onChange={() => switchColorMode(isDarkMode ? "light" : "dark")}
            />
            <Text>Dark Mode</Text>
          </>
        )}
      </HStack>
    </VStack>
  );
};

export default AppThemeControls;
