import { Platform } from "../../hooks/useQueryController";
import { HStack, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaWindows, FaPlaystation, FaXbox } from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import { SiSega } from "react-icons/si";

interface PlatformIconListProps {
  platforms: Platform[];
}

const PlatformIconList = ({ platforms }: PlatformIconListProps) => {
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    xbox: FaXbox,
    nintendo: SiNintendo,
    playstation: FaPlaystation,
    sega: SiSega,
  };

  return (
    <HStack margin="5px 0" flexWrap="wrap">
      {platforms.map((platform) => (
        <Icon key={platform.id} as={iconMap[platform.slug]} color="gray.500" />
      ))}
    </HStack>
  );
};

export default PlatformIconList;
