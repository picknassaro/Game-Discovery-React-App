import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar/NavBar";
import GameGrid from "./components/GameGrid/GameGrid";

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
        <GridItem gridArea="aside" style={{ width: "300px" }}>
          aside
        </GridItem>
      </Show>
      <Show above="lg">
        <GridItem
          gridArea="main"
          style={{ width: "calc(100vw - 300px)", padding: "0 40px" }}
        >
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
