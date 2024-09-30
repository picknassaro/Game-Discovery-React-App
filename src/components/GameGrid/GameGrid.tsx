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
  const skeletons = [...Array(10).keys()];

  const [pageSize, setPageSize] = useState<number>(20);
  const [filteredPlatform, setFilteredPlatform] = useState<number | undefined>(
    undefined
  );

  const siteSupportedPlatforms = [
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo",
    "SEGA",
  ];
  const { data: allPlatforms } = useQueryController<{
    id: number;
    name: string;
  }>({
    queryType: "platforms/lists/parents",
  });

  const filteredPlatforms = allPlatforms?.filter((platform) =>
    siteSupportedPlatforms.includes(platform.name)
  );
  console.log(filteredPlatforms);
  const filteredPlatformIds = filteredPlatforms?.map((platform) => platform.id);
  filteredPlatformIds?.unshift(0);
  const filteredPlatformNames = filteredPlatforms?.map(
    (platform) => platform.name
  );
  filteredPlatformNames?.unshift("All Platforms");

  const { data, error, isLoading } = useQueryController<Game>({
    queryType: "games",
    genres: selectedGenre,
    page_size: Number(pageSize),
    parent_platforms: filteredPlatform,
  });

  return (
    <>
      <Show above="lg">
        <Heading>Games</Heading>
      </Show>
      <QueryModSelector
        queryModHeader="Results Per Page"
        keepHeader={true}
        queryModValue={["20", "25", "30", "35", "40"]}
        selectedValue={pageSize}
        onSelect={(value) => setPageSize(Number(value as string))}
        takeValue="string"
      />
      <QueryModSelector
        queryModHeader="All Platforms"
        keepHeader={false}
        queryModKeys={filteredPlatformIds}
        queryModValue={filteredPlatformNames}
        selectedValue={
          filteredPlatform !== undefined
            ? filteredPlatformNames?.[
                filteredPlatformIds?.indexOf(filteredPlatform)
              ]
            : "Platform"
        }
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
          data.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              style={cardAndSkeletonStyles}
              siteSupportedPlatforms={siteSupportedPlatforms}
            />
          ))
        ) : (
          <Text>{error}</Text>
        )}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
