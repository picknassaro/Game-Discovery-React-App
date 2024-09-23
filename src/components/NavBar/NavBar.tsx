import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/images/logo.webp";
import ColorModeSwitch from "../ColorModeSwitch/ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent={"space-between"} padding={"10px"}>
      <HStack>
        <Image src={logo} boxSize={"60px"}></Image>
        <Text fontSize={"2xl"}>Nick's Game Hub</Text>
      </HStack>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
