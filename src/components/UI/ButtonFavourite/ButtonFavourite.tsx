import { Link } from 'react-router-dom';
import styles from './buttonFavourite.module.scss';
import { useState } from 'react';
import React from 'react';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { ProductItemType } from '../../../types/ProductItemType';
import { Product } from '../../../types/Product';
import classNames from 'classnames';

interface Props {
  product: ProductItemType | Product;
  callback: () => void;
}
export const ButtonFavourite: React.FC<Props> = ({ product, callback }) => {
  const [selectedFavourite, setSelectedFavourite] = useState(false);
  const products = useSelector((state: RootState) => state.product.favourites);

  const handleClickFavourite = () => {
    setSelectedFavourite(!selectedFavourite);
    callback();
  };

  const findProductInFavourites = (products: Product[], product: Product | ProductItemType) => {
    return products.some((favProduct: Product | ProductItemType) => favProduct.id === product.id);
  }

  const getButtonClass = (isProductInFavourites: boolean) => classNames(styles.button, {
    [styles.selected]: isProductInFavourites,
    [styles.default]: !isProductInFavourites,
  });

  const isProductInFavourites = findProductInFavourites(products, product);

  return (
    <>
      <Link
        to="#"
        className={getButtonClass(isProductInFavourites)}
        onClick={handleClickFavourite}
      >
      </Link>
    </>
  );
};
