import React from 'react';
import { Slider } from '../../components/Slider/Slider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
export const HomePage = () => {
  return (
    <>
      <h1 className="title">Welcome to Nice Gadgets store!</h1>
      <Slider/>
      <ProductsSlider title="Brand new models" />
    </>
  );
};
