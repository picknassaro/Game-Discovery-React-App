import { Button, HStack } from "@chakra-ui/react";

interface PaginationProps {
  pageNumber: number;
  onSelect: (value: number) => void;
}

const Pagination = ({ pageNumber, onSelect }: PaginationProps) => {
  const handleSelect = (value: number) => {
    onSelect(value);
    pageNumber = value;
    const form = document.getElementById("enterPageNumber") as HTMLInputElement;
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
      {pageNumber > 3 && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleSelect(pageNumber - 3)}
        >
          {pageNumber - 3}
        </Button>
      )}
      {pageNumber > 2 && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleSelect(pageNumber - 2)}
        >
          {pageNumber - 2}
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
        <Button size="sm" variant="solid" colorScheme="green">
          {pageNumber}
        </Button>
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
        onClick={() => handleSelect(pageNumber + 2)}
      >
        {pageNumber + 2}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleSelect(pageNumber + 3)}
      >
        {pageNumber + 3}
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
