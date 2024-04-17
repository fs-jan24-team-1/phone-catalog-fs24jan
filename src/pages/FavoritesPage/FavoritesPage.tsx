import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types/Product';

export const FavoritesPage = () => {
  let products = useSelector((state: RootState) => state.product.favourites);
  const numberOfItems = products.length;

  return (
    <>
      <h1 className="title">Favourites</h1>
      <h3>{numberOfItems} items</h3>

      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};
