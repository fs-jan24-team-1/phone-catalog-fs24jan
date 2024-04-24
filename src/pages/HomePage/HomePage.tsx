import React from 'react';
import { Slider } from '../../components/Slider/Slider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { SortProductBy } from '../../types/SortProductBy';
import { sortProductsBy } from '../../utils/sortProductsBy';
import styles from './homepage.module.scss';

import { CategoriesSection } from '../../components/CategoriesSection';
import { useScrollToTopEffect } from '../../utils/useScrollToTopEffect';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const [t] = useTranslation("global");

  useScrollToTopEffect();

  return (
    <div className={styles.containers}>
      <h1 className={styles.title}>{t('home.Welcome to Nice Gadgets store!')}</h1>
      <Slider />

      <ProductsSlider
        title={t('home.Brand new models')}
        products={sortProductsBy(products, SortProductBy.year)}
      />

      <CategoriesSection />

      <ProductsSlider
        title={t('home.Hot prices')}
        products={sortProductsBy(products, SortProductBy.price)}
      />
    </div>
  );
};
