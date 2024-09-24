import { VStack, HStack, Text, Switch } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  return (
    <VStack>
      <HStack>
        <Switch colorScheme="green" />
        <Text>Dark Mode</Text>
      </HStack>
    </VStack>
  );
};

export default ColorModeSwitch;
