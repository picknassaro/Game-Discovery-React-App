import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../../hooks/useGames";
import GameCard from "../GameCard/GameCard";

const GameGrid = () => {
  const { games, error } = useGames();

  return (
    <>
      {games.length > 0 ? (
        <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 5}} spacing={10}>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </SimpleGrid>
      ) : (
        <Text>{error}</Text>
      )}
    </>
  );
};

export default GameGrid;
