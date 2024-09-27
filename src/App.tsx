import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar/NavBar";
import GameGrid from "./components/GameGrid/GameGrid";
import GenreList from "./components/GenreList/GenreList";

function App() {
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
      <Show above="lg">
        <GridItem
          gridArea="aside"
          style={{ width: "300px", padding: "0 20px" }}
        >
          <GenreList />
        </GridItem>
      </Show>
      <Show above="lg">
        <GridItem gridArea="main" style={{ width: "calc(100vw - 300px)" }}>
          <GameGrid />
        </GridItem>
      </Show>
      <Show below="lg">
        <GridItem gridArea="main">
          <GameGrid />
        </GridItem>
      </Show>
    </Grid>
  );
}

export default App;
