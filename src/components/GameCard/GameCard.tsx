import { Game } from "../../hooks/useGames";
import { Card, CardBody, Image, Heading, HStack } from "@chakra-ui/react";
import PlatformIconList from "../PlatformIconList/PlatformIconList";
import CriticScore from "../CriticScore/CriticScore";
import getCroppedImageUrl from "../../services/imageCrop";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card
      borderRadius={10}
      overflow="hidden"
      boxShadow="0px 0px 10px 0 rgba(0, 0, 0, 0.1)"
    >
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
