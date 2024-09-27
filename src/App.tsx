import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar/NavBar";
import GameGrid from "./components/GameGrid/GameGrid";
import GenreList from "./components/GenreList/GenreList";
import { useState } from "react";

function App() {
  // State to keep track of the selected genre. We want to highlight the selected genre in the GenreList component and filter the games based on the selected genre.
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();

  return (
    <Grid
      templateAreas={{
        base: `"nav"
               "main"`,
        lg: `"nav nav"
             "aside main"`,
      }}
    >
      <GridItem gridArea="nav">
        <NavBar />
      </GridItem>

      {/* Hide this copy of the genre list on mobile */}
      <Show above="lg">
        <GridItem gridArea="aside" width="300px">
          <GenreList
            // This will be passed in so we can target the selected genre by id and highlight it.
            selectedGenre={selectedGenre}
            // This will update the selected genre when a genre is clicked
            onSelectGenre={setSelectedGenre}
          />
        </GridItem>
      </Show>

      <GridItem
        gridArea="main"
        width={["100%", "100%", "100%", "calc(100vw - 300px)"]}
      >
        {/* This will update the games list when a genre is clicked */}
        <GameGrid selectedGenre={selectedGenre} />
      </GridItem>
    </Grid>
  );
}

export default App;
