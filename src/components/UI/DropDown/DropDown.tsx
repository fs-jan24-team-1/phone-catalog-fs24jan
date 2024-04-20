import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'option 1', label: 'Option 1' },
  { value: 'option 2', label: 'Option 2' },
  { value: 'option 3', label: 'Option 3' },
];

const customStyles = {
  control: (base: any, { isFocused }: any) => ({
    ...base,
    display: 'flex',
    gap: '85px',
    padding: '12px, 10px',
    height: '40px',

    boxSizing: 'border-box',

    border: `1px solid ${isFocused ? '#0F0F11' : '#B4BDC3'}`,
    boxShadow: 'none',
    borderRadius: '8px',

    color: '#0F0F11',
    fontFamily: 'Mont',
    fontSize: '14px',
    fontWeight: '700',

    '&:hover': {
      borderColor: '#89939A',
    },
  }),
  option: (base: any, { isSelected }: any) => ({
    ...base,
    height: '32px',
    fontSize: '14px',
    color: isSelected ? '#0F0F11' : '#89939A',
    fontWeight: '700',
    backgroundColor: isSelected ? '#FAFBFC' : '#fff',
    '&:hover': {
      backgroundColor: '#FAFBFC',
      color: '#0F0F11',
    },
  }),
  dropdownIndicator: (base: any, state: any) => ({
    ...base,
    transition: 'all .3s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
  }),
};

export const Dropdown = () => {
  return (
    <div style={{}}>
      <Select
        // isMulti
        defaultValue={options[0]}
        options={options}
        styles={customStyles}
      />
    </div>
  );
};
