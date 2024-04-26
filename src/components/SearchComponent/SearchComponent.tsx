import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import styles from './searchComponent.module.scss';
import { motion } from 'framer-motion';

export const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchTerm('');
  }, [location.pathname]);

  const delayedSearch = debounce((value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('query', value);
    navigate(`?${searchParams.toString()}`);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    delayedSearch(value);
  };

  const inputVariants = {
    hidden: {
      opacity: 0,
      x: 100,

      transition: {
        type: 'spring',
        bounce: 0.1,
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      x: 0,

      transition: {
        type: 'spring',
        bounce: 0.1,
        duration: 0.2,
      },
    },
  };

  const handleSearchClear = () => {
    if (searchTerm.length > 0) {
      setSearchTerm('');
    } else {
      setIsSearchVisible(false);
    }
  };

  return (
    <>
      <label
        htmlFor="search"
        className={styles.search}
        onClick={() => setIsSearchVisible(true)}
      >
        <div className={styles.icon}></div>
      </label>

      {isSearchVisible && (
        <>
          <motion.input
            type="text"
            id="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
            variants={inputVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className={styles.input}
            autoFocus
            // onBlur={() => setIsSearchVisible(false)}
          />

          <div
            className={styles.clear}
            onClick={handleSearchClear}
          ></div>
        </>
      )}
    </>
  );
};
