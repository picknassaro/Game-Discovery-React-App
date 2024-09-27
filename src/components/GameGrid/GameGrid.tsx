import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../../hooks/useGames";
import GameCard from "../GameCard/GameCard";
import GameCardSkeleton from "../GameCardSkeleton/GameCardSkeleton";

const cardStyles = {
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0px 0px 10px 0 rgba(0, 0, 0, 0.1)",
  margin: "0 20px 40px",
};

const GameGrid = () => {
  // data, error, and isLoading are returned from useGames.
  // useGames receives them from useData and exports them. useData determines what to return by looking at the endoint passed into useData in useGames.
  // useGames also takes the data and uses exported props to shape that data into what is needed, but that doesn't matter here.
  const { data, error, isLoading } = useGames();
  // Generate an array of 10 elements to be used as skeletons
  const skeletons = [...Array(10).keys()];

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 3, lg: 2, xl: 4, "2xl": 5 }}>
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardSkeleton key={skeleton} style={cardStyles} />
          ))}
        {data.length > 0 ? (
          // Take the array if items returned as "data" and map over them where each item is called a game. This is to better keep track of the data specifically is. Data could be games, it could be genres, it could be a lot of things. Think of this as "map the array of data as a list of individual games..."
          data.map((game) => (
            // ...and then for each game, render a GameCard component with the game data.
            // GameCard will use the the props shaped in useGames to render the game data.
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
