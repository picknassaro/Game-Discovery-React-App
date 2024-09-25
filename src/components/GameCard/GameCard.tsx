import { Game } from "../../hooks/useGames";
import { Card, CardBody, Image, Heading } from "@chakra-ui/react";
import PlatformIconList from "../PlatformIconList/PlatformIconList";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card borderRadius={10} style={{ overflow: "hidden" }}>
      <Image src={game.background_image} alt={game.name} />
      <CardBody>
        <Heading style={{ fontSize: "2xl" }}>{game.name}</Heading>
        <PlatformIconList platforms={game.parent_platforms.map(p => p.platform)} />
      </CardBody>
    </Card>
  );
};

export default GameCard;
