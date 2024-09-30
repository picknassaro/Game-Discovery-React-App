import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Show,
  Spinner,
  Text,
} from "@chakra-ui/react";
import getCroppedImageUrl from "../../services/imageCrop";
import useQueryController, { Genre } from "../../hooks/useQueryController";

interface GenreListProps {
  selectedGenre: number | undefined;
  onSelectGenre: (genreId: number | undefined) => void;
}

const GenreList = ({ selectedGenre, onSelectGenre }: GenreListProps) => {
  const { data, isLoading, error } = useQueryController<Genre>({
    queryType: "genres",
  });

  return (
    <>
      <Show above="lg">
        <Heading margin="0 20px 20px">Genres</Heading>
      </Show>
      <List
        width={["100vw", "100vw", "100vw", "auto"]}
        display={["flex", "flex", "flex", "block"]}
        alignItems={["center", "center", "center", ""]}
        whiteSpace={["nowrap", "nowrap", "nowrap", "normal"]}
        overflow={["scroll", "scroll", "scroll", "auto"]}
      >
        {isLoading && <Spinner />}
        {error && <Text>¯\_(ツ)_/¯</Text>}
        <ListItem>
          <HStack justifyContent="center">
            <Button
              minWidth="100px"
              width="calc(100% - 20px)"
              margin={["0 20px", "0 20px", "0 20px", "0 0 0 20px"]}
              padding="0 20px"
              onClick={() => {
                onSelectGenre(undefined);
              }}
            >
              All
            </Button>
          </HStack>
        </ListItem>
        {data.map((genre) => (
          <ListItem
            key={genre.id}
            margin={[
              "20px 40px 20px 0",
              "20px 40px 20px 0",
              "20px 40px 20px 0",
              "10px 0 10px 20px",
            ]}
          >
            <HStack
              justifyContent="flex-start"
              alignItems="stretch"
              gap={["0", "0", "0", "0.5rem"]}
            >
              <Image
                boxSize="40px"
                borderRadius="8px"
                src={getCroppedImageUrl(genre.image_background)}
                alt={genre.name}
              />
              <Button
                marginRight={["20px", "20px", "20px", "0"]}
                minWidth="unset"
                flexGrow="1"
                justifyContent="flex-start"
                fontSize="lg"
                colorScheme={genre.id === selectedGenre ? "green" : "gray"}
                onClick={() => {
                  onSelectGenre(genre.id);
                }}
                fontWeight={genre.id === selectedGenre ? "bold" : "normal"}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
