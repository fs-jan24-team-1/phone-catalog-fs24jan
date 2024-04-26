import { FC } from 'react';
import Select, { StylesConfig, CSSObjectWithLabel } from 'react-select';
import { SortBy } from 'components/Filter';
import { useSearchParams } from 'react-router-dom';

interface Option {
  value: number | string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelectChange: (selectedOption: SortBy) => void;
  isSortDropdown?: boolean;
}

interface CustomStylesProps {
  isFocused?: boolean;
  isSelected?: boolean;
  menuIsOpen?: boolean;
}

const baseStyles: StylesConfig<Option, false> = {
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
    cursor: 'pointer',

    '&:hover': {
      borderColor: '#89939A',
    },
  }),

  option: (base: CSSObjectWithLabel, { isSelected }: CustomStylesProps) => ({
    ...base,
    fontSize: '14px',
    lineHeight: '21px',
    cursor: 'pointer',

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

const customStyles: StylesConfig<Option, false> = {
  container: (base: CSSObjectWithLabel) => ({
    ...base,
    minWidth: '180px',
  }),
  ...baseStyles,
};

const defaultStyles: StylesConfig<Option, false> = {
  ...baseStyles,
  container: (base: CSSObjectWithLabel) => ({
    ...base,
    width: '136px',
  }),
};

export const Dropdown: FC<DropdownProps> = ({
  options,
  onSelectChange,
  isSortDropdown,
}) => {
  const handleChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      onSelectChange(selectedOption.value as SortBy);
    }
  };

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const sortByParam = params.get('sort');
  const perPageParam = params.get('perPage');

  const getSelectedValue = (options: Option[]) => {
    if (options[0].value === SortBy.age) {
      return options.find(option => option.value === sortByParam);
    }
    return options.find(option => option.value === Number(perPageParam));
  };

  const isWideScreen = window.innerWidth >= 640;

  return (
    <div>
      <Select
        defaultValue={getSelectedValue(options) || options[0]}
        options={options}
        styles={isSortDropdown && isWideScreen ? customStyles : defaultStyles}
        isSearchable={false}
        onChange={handleChange}
      />
    </div>
  );
};
