import { VStack, HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack>
      <HStack>
        <Switch
          colorScheme={"green"}
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
        />
        <Text>Dark Mode</Text>
      </HStack>
    </VStack>
  );
};

export default ColorModeSwitch;
