import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../../hooks/useGames";
import GameCard from "../GameCard/GameCard";

// Components/GameGrid was originally built with the functionality of a rudimentary version of Components/GameCard, and the Axios functionality of hooks/useGames and services/apiClients. Their functionalities were broken out into separate files.

const GameGrid = () => {
  const { games, error } = useGames();

  return (
    <>
      {games.length > 0 ? (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={10}>
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
