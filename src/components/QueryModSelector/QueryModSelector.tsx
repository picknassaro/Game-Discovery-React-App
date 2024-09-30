import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

interface QueryModSelectorProps {
  queryModHeader: string;
  keepHeader: boolean;
  queryMod?: string[];
  selectedValue?: string | number | undefined;
  onSelect: (value: string | number) => void;
  takeValue: "string" | "index";
}

const QueryModSelector = ({
  queryModHeader,
  keepHeader,
  queryMod,
  selectedValue,
  onSelect,
  takeValue,
}: QueryModSelectorProps) => {
  const handleSelect = (value: string | number) => {
    onSelect(value);
    console.log(value);
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} margin="20px">
        {!selectedValue && queryModHeader && queryModHeader}
        {selectedValue && keepHeader && `${selectedValue} ${queryModHeader}`}
        {selectedValue && !keepHeader && selectedValue}
      </MenuButton>
      <MenuList>
        {queryMod &&
          queryMod.map((mod, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                if (takeValue === "string") handleSelect(mod);
                else handleSelect(Number(index) + 1);
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
