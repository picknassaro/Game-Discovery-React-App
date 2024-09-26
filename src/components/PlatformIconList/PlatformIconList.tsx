{
  /* Add commentary to this file */
}

import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { Platform } from "../../hooks/useGames";
import { HStack, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface PlatformIconListProps {
  platforms: Platform[]; // An array of objects shaped by the Platform interface in hooks/useGames.
}

// Pass in the PlatformIconListProps interface as a prop to this component.
const PlatformIconList = ({ platforms }: PlatformIconListProps) => {
  // Create an object that maps the platform names to their respective icons.
  // iconMap will return an object. This object will contain keys that are strings and values that are IconType objects.
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    xbox: FaXbox,
    nintendo: SiNintendo,
    playstation: FaPlaystation,
    linux: FaLinux,
    ios: MdPhoneIphone,
    android: FaAndroid,
    mac: FaApple,
    web: BsGlobe,
  };

  return (
    <HStack margin="10px 0">
      {platforms.map((platform) => (
        <Icon as={iconMap[platform.slug]} color="gray.500" />
      ))}
    </HStack>
  );
};

export default PlatformIconList;
