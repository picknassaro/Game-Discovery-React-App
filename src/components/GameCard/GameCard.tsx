import { Game } from "../../hooks/useGames";
import { Card, CardBody, Image, Heading, HStack } from "@chakra-ui/react";
import PlatformIconList from "../PlatformIconList/PlatformIconList";
import CriticScore from "../CriticScore/CriticScore";
import getCroppedImageUrl from "../../services/imageCrop";

// Import the Game type from the useGames hook and use it to shape a prop to pass into the render function below.
interface GameCardProps {
  game: Game;
  style: React.CSSProperties;
}

const GameCard = ({ game, style }: GameCardProps) => {
  return (
    <Card style={style}>
      {/* Use the getCroppedImageUrl function to crop the image */}
      <Image src={getCroppedImageUrl(game.background_image)} alt={game.name} />
      <CardBody>
        <Heading
          fontSize="18px"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          marginBottom="10px"
        >
          {game.name}
        </Heading>
        <HStack justifyContent="space-between">
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
