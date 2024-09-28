import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
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
      <Heading margin="0 20px 20px">Genres</Heading>
      <List>
        {isLoading && <Spinner />}
        {error && <Text>¯\_(ツ)_/¯</Text>}
        <ListItem>
          <HStack justifyContent="center">
            <Button
              width="calc(100% - 40px)"
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
          <ListItem key={genre.id} margin="10px 0" padding="0 20px">
            <HStack justifyContent="flex-start" alignItems="stretch">
              <Image
                boxSize="32px"
                borderRadius="8px"
                src={getCroppedImageUrl(genre.image_background)}
                alt={genre.name}
              />
              <Button
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
