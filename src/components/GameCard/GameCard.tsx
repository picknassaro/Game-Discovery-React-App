import { Game } from "../../hooks/useGames";
import { Card, CardBody, Image, Heading } from "@chakra-ui/react";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <>
      <Card borderRadius={10} style={{overflow: "hidden"}}>
        <Image src={game.background_image} alt={game.name} />
        <CardBody>
          <Heading style={{fontSize: "2xl"}}>{game.name}</Heading>
        </CardBody>
      </Card>
    </>
  );
};

export default GameCard;
