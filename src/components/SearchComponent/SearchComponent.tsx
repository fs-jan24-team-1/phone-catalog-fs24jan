import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { debounce } from 'lodash';

export const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchTerm('');
  }, [location.pathname]);

  const delayedSearch = debounce((value: string) => {
    navigate(`?query=${value}`);
  }, 300);

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    delayedSearch(value);
  };

  return (
    <div>
      <input type="text" placeholder="Search" value={searchTerm} onChange={handleChange} />
    </div>
  );
};
