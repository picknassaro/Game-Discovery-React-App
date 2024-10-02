import { Button, HStack, Input } from "@chakra-ui/react";

interface PaginationProps {
  pageNumber: number;
  onSelect: (value: number) => void;
}

const Pagination = ({ pageNumber, onSelect }: PaginationProps) => {
  const handleSelect = (value: number) => {
    onSelect(value);
    pageNumber = value;
    const form = document.getElementById('enterPageNumber') as HTMLInputElement;
    form.value = "";
  };

  const handleSubmit = (value: string) => {
    onSelect(Number(value));
    pageNumber = Number(value);
  };

  return (
    <HStack
      width="calc(100% - 40px)"
      margin="20px"
      alignItems="stretch"
      justifyContent="flex-end"
    >
      {pageNumber > 1 && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleSelect(pageNumber - 1)}
        >
          Prev
        </Button>
      )}
      {pageNumber > 1 && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleSelect(pageNumber - 1)}
        >
          {pageNumber - 1}
        </Button>
      )}
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const input = form.elements[0] as HTMLInputElement;
          handleSubmit(input.value);
        }}
      >
        <Input
          id="enterPageNumber"
          minWidth="32px"
          maxWidth="80px"
          height="32px"
          display="inline-block"
          padding="0"
          textAlign="center"
          placeholder={pageNumber.toString()}
          _placeholder={{ color: "gray.800", opacity: 1 }}
          paddingTop="1px"
          textColor="black"
          _focus={{ _placeholder: { color: "transparent" }, placeholderShown: "false" }}
        ></Input>
      </form>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleSelect(pageNumber + 1)}
      >
        {pageNumber + 1}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleSelect(pageNumber + 1)}
      >
        Next
      </Button>
    </HStack>
  );
};

export default Pagination;
