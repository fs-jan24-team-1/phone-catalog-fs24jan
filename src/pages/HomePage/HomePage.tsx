import React from 'react';
import { Slider } from '../../components/Slider/Slider';
import { CategoriesSection } from '../../components/CategoriesSection';
export const HomePage = () => {
  return (
    <>
      <h1 className="title">Welcome to Nice Gadgets store!</h1>
      <Slider />
      <CategoriesSection />
    </>
  );
};
