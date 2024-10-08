import { Heading, HStack, Show, SimpleGrid, Text } from "@chakra-ui/react";
import useQueryController, { Game } from "../../hooks/useQueryController";
import GameCard from "../GameCard/GameCard";
import GameCardSkeleton from "../GameCardSkeleton/GameCardSkeleton";
import QueryModSelector from "../QueryModSelector/QueryModSelector";
import { useState } from "react";
import GameSearch from "../GameSearch/GameSearch";
import Pagination from "../Pagination/Pagination";

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

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPlatform, setFilteredPlatform] = useState<number | undefined>(
    undefined
  );
  const [sortedBy, setSortedBy] = useState<string>("-metacritic");
  const [sortByLabel, setSortByLabel] = useState<string>("Highest Rated");
  const [currentPage, setCurrentPage] = useState<number>(1);

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
    search: searchQuery,
    page_size: 20,
    parent_platforms: filteredPlatform,
    ordering: sortedBy,
    page: currentPage,
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
          "calc(100vw)",
          "unset",
        ]}
        display="flex"
        alignItems="flex-start"
        whiteSpace="nowrap"
        overflowX="scroll"
        padding="0 20px"
        gap="0"
      >
        <GameSearch
          onSubmit={(value) => {
            setSearchQuery(value as string);
            setCurrentPage(1);
          }}
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
          onSelect={(value) => {
            setFilteredPlatform(value as number);
            setCurrentPage(1);
          }}
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
          onSelect={(value) => {
            setSortedBy(value as string);
            setCurrentPage(1);
          }}
          onChangeLabel={(value) => {
            setSortByLabel(value as string);
          }}
          takeValue="index"
        />
      </HStack>
      <Pagination pageNumber={currentPage} onSelect={setCurrentPage} />
      <SimpleGrid
        spacing="5"
        margin="0 20px"
        columns={{
          base: 1,
          sm: 1,
          "sm+": 2,
          md: 3,
          lg: 2,
          "lg+": 3,
          xl: 4,
          "2xl": 5,
        }}
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
      <Pagination pageNumber={currentPage} onSelect={setCurrentPage} />
    </>
  );
};

export default GameGrid;
