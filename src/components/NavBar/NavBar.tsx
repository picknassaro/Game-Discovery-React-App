import { Hide, HStack, Image, Show, Text, VStack } from "@chakra-ui/react";
import logo from "../../assets/images/logo.webp";
import AppThemeControls from "../AppThemeControls/AppThemeControls";

const NavBar = () => {
  return (
    <>
      <Show above="sm+">
        <HStack
          justifyContent="space-between"
          padding="10px"
          marginBottom="20px"
        >
          <HStack>
            <Image src={logo} boxSize="60px"></Image>
            <Text fontSize="2xl">Nick's Game Hub</Text>
          </HStack>
          <AppThemeControls />
        </HStack>
      </Show>
      <Hide above="sm+">
        <VStack
          justifyContent="space-between"
          padding="10px"
          marginBottom="20px"
        >
          <HStack>
            <Image src={logo} boxSize="60px"></Image>
            <Text fontSize="2xl">Nick's Game Hub</Text>
          </HStack>
          <AppThemeControls />
        </VStack>
      </Hide>
    </>
  );
};

export default NavBar;
