import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import GameGrid from "./components/GameGrid/GameGrid";
import GenreList from "./components/GenreList/GenreList";

function App() {
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

      <GridItem
        gridArea={["", "", "", "", "aside"]}
        width={["100%", "100%", "100%", "100%", "300px"]}
      >
        <GenreList
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />
      </GridItem>

      <GridItem
        gridArea={["", "", "", "", "main"]}
        width={["100%", "100%", "100%", "100%", "calc(100vw - 300px)"]}
      >
        <GameGrid selectedGenre={selectedGenre} />
      </GridItem>
    </Grid>
  );
}

export default App;
