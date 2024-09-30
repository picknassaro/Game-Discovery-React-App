import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

interface QueryModSelectorProps {
  queryModHeader: string;
  keepHeader: boolean;
  queryModKeys?: number[];
  queryModValue?: string[];
  selectedValue?: string | number | undefined;
  onSelect: (value: string | number) => void;
  takeValue: "string" | "index";
}

const QueryModSelector = ({
  queryModHeader,
  keepHeader,
  queryModKeys,
  queryModValue,
  selectedValue,
  onSelect,
  takeValue,
}: QueryModSelectorProps) => {
  const handleSelect = (value: string | number) => {
    onSelect(value);
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} margin="20px">
        {!selectedValue && queryModHeader && queryModHeader}
        {selectedValue && keepHeader && `${selectedValue} ${queryModHeader}`}
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
