import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types/Product';

export const CartPage = () => {
  let products = useSelector((state: RootState) => state.product.cart);
  // const numberOfItems = products.length;

  return (
    <>
      <h1 className="title">Cart</h1>

      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};
