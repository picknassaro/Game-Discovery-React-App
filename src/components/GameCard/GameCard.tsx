// Import the Game props from the useQueryController hook. Don't import the whole hook, because <PlatformIconList> will use the Platform interface from the useQueryController hook, and that will be imported separately.
import { Game } from "../../hooks/useQueryController";
import { Card, CardBody, Image, Heading, HStack } from "@chakra-ui/react";
import PlatformIconList from "../PlatformIconList/PlatformIconList";
import CriticScore from "../CriticScore/CriticScore";
import getCroppedImageUrl from "../../services/imageCrop";

interface GameCardProps {
  // Import the Game type from the useQueryController hook and use it to shape a prop to pass into the render function below.
  game: Game;
  // React.CSSProperties allows us to use the style prop in our custom made components.
  style: React.CSSProperties;
}

const GameCard = ({ game, style }: GameCardProps) => {
  return (
    <Card style={style}>
      {/* Use the getCroppedImageUrl function to crop the image */}
      <Image src={getCroppedImageUrl(game.background_image)} alt={game.name} />
      <CardBody style={{ containerType: "inline-size" }}>
        <Heading
          fontSize="7.5cqw"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          marginBottom="10px"
        >
          {game.name}
        </Heading>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
