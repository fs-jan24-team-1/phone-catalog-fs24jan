import React from 'react';
import Select, { StylesConfig, CSSObjectWithLabel } from 'react-select';
import { SortBy } from '../../Filter/Filter';

interface Option {
  value: number | string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelectChange: (selectedOption: SortBy) => void;
}

interface CustomStylesProps {
  isFocused?: boolean;
  isSelected?: boolean;
  menuIsOpen?: boolean;
}

const customStyles: StylesConfig<Option, false> = {
  control: (base: CSSObjectWithLabel, { isFocused }: CustomStylesProps) => ({
    ...base,

    border: `1px solid ${isFocused ? '#0F0F11' : '#B4BDC3'}`,
    boxShadow: 'none',
    borderRadius: '8px',

    color: '#0F0F11',
    fontFamily: 'Mont',
    fontSize: '14px',
    fontWeight: '700',
    minHeight: '40px',

    '&:hover': {
      borderColor: '#89939A',
    },
  }),

  option: (base: CSSObjectWithLabel, { isSelected }: CustomStylesProps) => ({
    ...base,
    fontSize: '14px',
    lineHeight: '21px',

    color: isSelected ? '#0F0F11' : '#89939A',
    fontWeight: '700',
    backgroundColor: isSelected ? '#FAFBFC' : '#fff',
    '&:hover': {
      backgroundColor: '#FAFBFC',
      color: '#0F0F11',
    },
  }),
  valueContainer: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: '0 12px',
    lineHeight: '1',
  }),
  dropdownIndicator: (base: CSSObjectWithLabel, state: CustomStylesProps) => ({
    ...base,
    transition: 'all .3s ease',
    transform: state.menuIsOpen ? 'rotate(180deg)' : 'none',
  }),
  indicatorSeparator: (base: CSSObjectWithLabel) => ({
    ...base,
    display: 'none',
  }),
  indicatorsContainer: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: '0 4px',
  }),
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelectChange,
}) => {
  const handleChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      onSelectChange(selectedOption.value as SortBy);
    }
  };

  return (
    <div>
      <Select
        defaultValue={options[0]}
        options={options}
        styles={customStyles}
        isSearchable={false}
        onChange={handleChange}
      />
    </div>
  );
};
