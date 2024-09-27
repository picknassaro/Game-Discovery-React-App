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
import useGenres from "../../hooks/useGenres";
import getCroppedImageUrl from "../../services/imageCrop";

const GenreList = () => {
  const { data, isLoading, error } = useGenres();

  return (
    <>
      <Heading>Genres</Heading>
      <List>
        {isLoading && <Spinner />}
        {error && <Text>¯\_(ツ)_/¯</Text>}
        {/* Map out data object as a series of items, each individually referred to as a genre. I will keep explaining what a map is in simple, non-technical terms to make sure the meaning sticks. */}
        {data.map((genre) => (
          <ListItem key={genre.id}>
            <HStack>
              <Image
                boxSize="32px"
                borderRadius="8px"
                padding="5px"
                src={getCroppedImageUrl(genre.image_background)}
                alt={genre.name}
              />
              <Button
                fontSize="lg"
                variant="link"
                onClick={() => {
                  console.log(genre);
                }}
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
