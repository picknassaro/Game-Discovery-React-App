import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

interface QueryModSelectorProps {
  queryModHeader: string;
  keepHeader: boolean;
  headerOrder?: number;
  queryModKeys?: string[] | number[];
  queryModValue?: string[];
  selectedValue?: string | number | undefined;
  onSelect: (value: string | number) => void;
  onChangeLabel?: (value: string | number) => void;
  takeValue: "string" | "index";
}

const QueryModSelector = ({
  queryModHeader,
  keepHeader,
  headerOrder,
  queryModKeys,
  queryModValue,
  selectedValue,
  onSelect,
  onChangeLabel,
  takeValue,
}: QueryModSelectorProps) => {
  const handleSelect = (value: string | number) => {
    onSelect(value);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        minWidth="unset"
        justifyContent="flex-start"
        margin="0 0 20px 20px"
        _hover={{ bg: "gray.200" }}
        _expanded={{ bg: "green.500", textColor: "white" }}
        _dark={{
          _hover: { bg: "whiteAlpha.300" },
          _expanded: { bg: "green.200", textColor: "gray.800" },
        }}
      >
        {!selectedValue && queryModHeader && queryModHeader}

        {selectedValue &&
          keepHeader &&
          headerOrder === 1 &&
          `${queryModHeader} ${selectedValue}`}

        {selectedValue &&
          keepHeader &&
          headerOrder === 2 &&
          `${selectedValue} ${queryModHeader}`}

        {selectedValue && !keepHeader && selectedValue}
      </MenuButton>
      <MenuList>
        {queryModValue &&
          queryModValue.map((mod, index) => (
            <MenuItem
              key={queryModKeys ? queryModKeys[index] : index}
              onClick={() => {
                if (takeValue === "string") handleSelect(mod);
                else handleSelect(queryModKeys ? queryModKeys[index] : index);
                if (onChangeLabel) onChangeLabel(mod);
              }}
            >
              {mod}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};

export default QueryModSelector;
