import { Input, useColorMode } from "@chakra-ui/react";
interface GameSearchProps {
  onSubmit: (value: string) => void;
}

const GameSearch = ({ onSubmit }: GameSearchProps) => {
  const { colorMode } = useColorMode();

  const handleSubmit = (value: string) => {
    onSubmit(value);
  };

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const input = form.elements[0] as HTMLInputElement;
        handleSubmit(input.value);
      }}
    >
      <Input
        type="text"
        flexGrow="1"
        minWidth="200px"
        maxWidth="400px"
        marginRight="auto"
        focusBorderColor={colorMode === "dark" ? "green.200" : "green.500"}
        _dark={{ _hover: { bg: "whiteAlpha.300" }, bg: "whiteAlpha.200" }}
        variant="filled"
        placeholder="Search Games"
      />
    </form>
  );
};

export default GameSearch;
