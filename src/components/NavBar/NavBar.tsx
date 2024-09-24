import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/images/logo.webp";
import AppThemeControls from "../AppThemeControls/AppThemeControls.tsx";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <HStack>
        <Image src={logo} boxSize="60px"></Image>
        <Text fontSize="2xl">Nick's Game Hub</Text>
      </HStack>
      <AppThemeControls />
    </HStack>
  );
};

export default NavBar;
