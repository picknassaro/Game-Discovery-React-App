import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav main"`,
          lg: `"nav nav"
               "aside main"`,
        }}
      >
        <GridItem gridArea="nav"><NavBar /></GridItem>
        <Show above={"lg"}>
          <GridItem gridArea="aside">aside</GridItem>
        </Show>
        <GridItem gridArea="main">main</GridItem>
      </Grid>
    </>
  );
}

export default App;
