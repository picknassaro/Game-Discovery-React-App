import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/images/logo.webp";

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} boxSize={"60px"}></Image>
      <Text fontSize={"2xl"}>Nick's Game Hub</Text>
    </HStack>
  );
};

export default NavBar;
