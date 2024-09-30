import { Game } from "../../hooks/useQueryController";
import { Card, CardBody, Image, Heading, HStack } from "@chakra-ui/react";
import PlatformIconList from "../PlatformIconList/PlatformIconList";
import CriticScore from "../CriticScore/CriticScore";
import getCroppedImageUrl from "../../services/imageCrop";

interface GameCardProps {
  game: Game;
  style: React.CSSProperties;
}

const GameCard = ({ game, style }: GameCardProps) => {
  return (
    <Card style={style}>
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
