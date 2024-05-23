import React, { useEffect, useState } from 'react';
import { Product } from 'types';
import styles from './homepage.module.scss';
import { useScrollToTopEffect } from 'utils';
import { Slider } from 'components/Slider';
import { ProductsSlider } from 'components/ProductsSlider';
import { CategoriesSection } from 'components/CategoriesSection';
import { useTranslation } from 'react-i18next';
import { getHotPricesProducts, getNewestProducts } from 'api';

export const HomePage = () => {
  const [newestProducts, setNewestProducts] = useState<Product[]>([]);
  const [hotestPriceProducts, setHotestPriceProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [t] = useTranslation('global');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [newestProducts, hotPriceProducts] = await Promise.all([
          getNewestProducts(),
          getHotPricesProducts(),
        ]);
        setNewestProducts(newestProducts);
        setHotestPriceProducts(hotPriceProducts);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useScrollToTopEffect();

  return (
    <div className={styles.containers}>
      <h1 className={styles.title}>
        {t('home.Welcome to Nice Gadgets store!')}
      </h1>
      <Slider />

      <ProductsSlider
        title={t('home.Brand new models')}
        products={newestProducts}
        loading={isLoading}
      />

      <CategoriesSection />

      <ProductsSlider
        title={t('home.Hot prices')}
        products={hotestPriceProducts}
        loading={isLoading}
      />
    </div>
  );
};
