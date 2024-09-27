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
// Import the Platform props from the useGames hook. Don't import the whole hook, because <GameCard> will use the Game interface from the useGames hook, and that will be imported separately.
import { Platform } from "../../hooks/useGames";
import { HStack, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface PlatformIconListProps {
  // Get the Platform interface data from useGames hook as an array. See useGames for what key-value pairs it contains. Spoiler: the keys are id, name, and slug, which will be used below.
  platforms: Platform[];
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
    <HStack margin="5px 0" flexWrap="wrap">
      {/* "Map out" the platforms object as a bunch of individual objects and  */}
      {platforms.map((platform) => (
        <Icon key={platform.id} as={iconMap[platform.slug]} color="gray.500" />
      ))}
    </HStack>
  );
};

export default PlatformIconList;
