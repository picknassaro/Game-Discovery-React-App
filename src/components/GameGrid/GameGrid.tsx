import { Heading, Show, SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../../hooks/useGames";
import GameCard from "../GameCard/GameCard";
import GameCardSkeleton from "../GameCardSkeleton/GameCardSkeleton";

interface GameGridProps {
  selectedGenre: number | undefined;
}

const cardAndSkeletonStyles = {
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0px 0px 10px 0 rgba(0, 0, 0, 0.1)",
};

const GameGrid = ({ selectedGenre }: GameGridProps) => {
  // data, error, and isLoading are returned from useGames.
  // useGames receives them from useData and exports them. useData determines what to return by looking at the endoint passed into useData in useGames.
  // useGames also takes the data and uses exported props to shape that data into what is needed, but that doesn't matter here.
  const { data, error, isLoading } = useGames({ genres: selectedGenre });
  // Generate an array of 10 elements to be used as skeletons
  const skeletons = [...Array(10).keys()];

  return (
    <>
      <Show above="lg">
        <Heading margin="0 20px 20px">Games</Heading>
      </Show>
      <SimpleGrid
        spacing="5"
        margin="0 20px"
        columns={{ base: 1, sm: 1, md: 2, lg: 2, "lg+": 3, xl: 4, "2xl": 5 }}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardSkeleton key={skeleton} style={cardAndSkeletonStyles} />
          ))}
        {data.length > 0 ? (
          // Take the array if items returned as "data" and map over them where each item is called a game. This is to better keep track of the data specifically is. Data could be games, it could be genres, it could be a lot of things. Think of this as "map the array of data as a list of individual games..."
          data.map((game) => (
            // ...and then for each game, render a GameCard component with the game data.
            // GameCard will use the the props shaped in useGames to render the game data.
            <GameCard key={game.id} game={game} style={cardAndSkeletonStyles} />
          ))
        ) : (
          <Text>{error}</Text>
        )}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
