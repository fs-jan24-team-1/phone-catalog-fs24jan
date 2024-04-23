import React from 'react';
import { Slider } from '../../components/Slider/Slider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { SortProductBy } from '../../types/SortProductBy';
import { sortProductsBy } from '../../utils/sortProductsBy';

export const HomePage = () => {
  const products = useSelector((state: RootState) => state.product.products);
  return (
    <>
      <h1 className="title">Welcome to Nice Gadgets store!</h1>
      <Slider/>
      <ProductsSlider title="Brand new models" products={sortProductsBy(products, SortProductBy.year)} />
      <ProductsSlider title="Hot prices" products={sortProductsBy(products, SortProductBy.price)} />
    </>
  );
};
