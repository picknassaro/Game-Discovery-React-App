import { Text } from "@chakra-ui/react";
import useGames from "../../hooks/useGames";

const GameGrid = () => {
  const { games, error } = useGames();

  return (
    <>
      {games.length > 0 ? (
        <ul>
          {games.map((game) => (
            <li key={game.id}>{game.name}</li>
          ))}
        </ul>
      ) : (
        <Text>{error}</Text>
      )}
    </>
  );
};

export default GameGrid;
