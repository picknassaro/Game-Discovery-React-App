import { Heading, HStack, Show, SimpleGrid, Text } from "@chakra-ui/react";
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
  const [sortedBy, setSortedBy] = useState<string>("-metacritic");
  const [sortByLabel, setSortByLabel] = useState<string>("Highest Rated");

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
    ordering: sortedBy,
  });

  return (
    <>
      <Show above="lg">
        <Heading margin="0 0 20px 20px">Games</Heading>
      </Show>
      <HStack
        width={[
          "calc(100vw)",
          "calc(100vw)",
          "calc(100vw)",
          "unset",
        ]}
        display="flex"
        alignItems="center"
        whiteSpace="nowrap"
        overflow="scroll"
        padding="0 0 0 20px"
        gap="0"
      >
        <QueryModSelector
          queryModHeader="Results Per Page"
          keepHeader={true}
          headerOrder={2}
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
        <QueryModSelector
          queryModHeader="Sort By"
          keepHeader={true}
          headerOrder={1}
          queryModKeys={[
            "name",
            "-name",
            "released",
            "-released",
            "-metacritic",
            "metacritic",
          ]}
          queryModValue={[
            "A-Z",
            "Z-A",
            "Newest",
            "Oldest",
            "Highest Rating",
            "Lowest Rating",
          ]}
          selectedValue={sortByLabel}
          onSelect={(value) => setSortedBy(value as string)}
          onChangeLabel={(value) => setSortByLabel(value as string)}
          takeValue="index"
        />
      </HStack>
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
