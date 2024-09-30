import { Heading, Show, SimpleGrid, Text } from "@chakra-ui/react";
import useQueryController, { Game } from "../../hooks/useQueryController";
import GameCard from "../GameCard/GameCard";
import GameCardSkeleton from "../GameCardSkeleton/GameCardSkeleton";
import QueryModSelector from "../QueryModSelector/QueryModSelector";
import { useState } from "react";

interface GameGridProps {
  selectedGenre: number | undefined;
}

const cardAndSkeletonStyles = {
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0px 0px 10px 0 rgba(0, 0, 0, 0.1)",
};

const GameGrid = ({ selectedGenre }: GameGridProps) => {
  const [pageSize, setPageSize] = useState<number>(20);
  const [filteredPlatform, setFilteredPlatform] = useState<number | undefined>(
    undefined
  );

  const { data, error, isLoading } = useQueryController<Game>({
    queryType: "games",
    genres: selectedGenre,
    page_size: Number(pageSize),
    parent_platforms: filteredPlatform,
  });

  const skeletons = [...Array(10).keys()];

  return (
    <>
      <Show above="lg">
        <Heading>Games</Heading>
      </Show>
      <QueryModSelector
        queryModHeader={`Results Per Page`}
        keepHeader={true}
        queryMod={["20", "25", "30", "35", "40"]}
        selectedValue={pageSize}
        onSelect={(value) => setPageSize(Number(value as string))}
        takeValue="string"
      />
      <QueryModSelector
        queryModHeader="Platform"
        keepHeader={false}
        // we need to get the list of parent platforms for this instance of queryMod by querying https://api.rawg.io/api/platforms/lists/parents. when we map over the list of parent platforms returned by the api call, we set the keys to be the ids of the parent platforms and the values to be the names of the parent platforms. This way, we can use the parent platform id as the value to filter the games by parent platform. however, we need to only map parent platforms whose ids match the ids of parent platforms we want to show.
        //queryMod={["PC", "PlayStation", "Xbox", "Nintendo", "SEGA"]}
        selectedValue={filteredPlatform}
        onSelect={(value) => setFilteredPlatform(value as number)}
        takeValue="index"
      />
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
            // GameCard will use the the props shaped in useQueryController to render the game data.
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
