// This file was originally built with the functionality of a rudimentary version of Components/GameCard, and the Axios functionality of hooks/useGames and services/apiClients. Their functionalities were broken out into separate files.
import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../../hooks/useGames";
import GameCard from "../GameCard/GameCard";
import GameCardSkeleton from "../GameCardSkeleton/GameCardSkeleton";

const cardStyles = {
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0px 0px 10px 0 rgba(0, 0, 0, 0.1)",
};

const GameGrid = () => {
  // Grab games, error, and isLoading from the useGames hooks.
  const { games, error, isLoading } = useGames();
  // Create an array of 10 elements for the loading skeletons.
  const skeletons = [...Array(10).keys()];

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={10}>
        {/* If the loading state is true, map over the skeletons array and render a GameCardSkeleton component for each element. That markup will remove itself from the page as soon as the loading state becomes false. */}
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardSkeleton key={skeleton} style={cardStyles} />
          ))}
        {games.length > 0 ? (
          games.map((game) => (
            <GameCard key={game.id} game={game} style={cardStyles} />
          ))
        ) : (
          <Text>{error}</Text>
        )}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
