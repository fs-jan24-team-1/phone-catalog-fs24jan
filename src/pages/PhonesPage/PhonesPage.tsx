import { useSelector } from 'react-redux';
import { ProductCard } from '../../components/ProductCard';
import { RootState } from '../../store/store';
import { useEffect } from 'react';
import { Product } from '../../types/Product';

export const PhonesPage = () => {
  let products = useSelector((state: RootState) => state.product.products);

  products = products.filter((product: Product) => product.category === 'phones');
  const numberOfItems = products.length;

  return (
    <div>
      <h1 className="title">Mobile phones</h1>
      <h3>{numberOfItems} models</h3>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
