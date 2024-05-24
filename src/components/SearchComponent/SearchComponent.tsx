import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import styles from './searchComponent.module.scss';
import { motion } from 'framer-motion';
import { getProducts } from 'api';
import { toast } from 'react-toastify';
import { Product } from 'types';
import { ProductCard } from 'components/ProductCard';
import { LottieAnimation } from 'components/UI/LottieAnimation';
import * as animationData from 'animations/Search.json';

export const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        toast.error('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setSearchTerm('');
    setFilteredProducts(products);
  }, [location.pathname, products]);

  const handleSearch = useCallback(
    debounce((value: string) => {
      searchParams.set('query', value);
      navigate(`?${searchParams.toString()}`);
      const filtered = products.filter(product => {
        const productNameWords = product.name.toLowerCase().split(/\s+/);
        const searchTermWords = value.toLowerCase().split(/\s+/);
        return searchTermWords.every(term =>
          productNameWords.some(word => word.includes(term)),
        );
      });
      setFilteredProducts(filtered);
      setNoResults(filtered.length === 0 && value.length > 0);
    }, 500),
    [products, searchParams, navigate],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearch(value);
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
    setSearchTerm('');
    searchParams.set('query', '');
    navigate(`?${searchParams.toString()}`);
    setFilteredProducts(products);
    setNoResults(false);
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
        <div className={styles.modal} onClick={() => setIsSearchVisible(false)}>
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.searchBar}>
              <motion.input
                type="text"
                id="search"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                className={styles.input}
                autoFocus
              />
              <span
                className={styles.clear}
                onMouseDown={event => {
                  event.preventDefault();
                  handleSearchClear();

                  if (!searchTerm.length) {
                    setIsSearchVisible(false);
                    searchParams.delete('query');
                    navigate(`?${searchParams.toString()}`);
                  }
                }}
              />
            </div>
            <div className={styles.results}>
              {filteredProducts.length > 0
                ? filteredProducts
                    .slice(0, 30)
                    .map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))
                : noResults && (
                    <div className={styles.noResults}>
                      <LottieAnimation animationData={animationData} />
                      <button
                        className={styles.button}
                        onClick={() => handleSearchClear()}
                      >
                        Try again
                      </button>
                    </div>
                  )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
