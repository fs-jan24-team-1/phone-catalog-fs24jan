import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';
import { getOneProduct } from 'api';
import classNames from 'classnames';
import { ProductItemType } from 'types';
import { toast } from 'react-toastify';

enum linkTypes {
  phones = 'phones',
  tablets = 'tablets',
  accessories = 'accessories',
  favorites = 'Favorites',
}

export const Breadcrumbs = () => {
  const location = useLocation();
  const { pathname } = location;
  const parts = pathname.split('/').filter((part: string) => part !== '');
  const [product, setProduct] = useState<ProductItemType | null>(null);

  const [productName, setProductName] = useState('');
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    if (productId) {
      getOneProduct(productId)
        .then(data => {
          setProduct(data);
        })
        .catch(() => {
          toast.error('Failed to fetch product');
        });
    }
  }, [productId]);

  async function getPhonesById() {
    const result = product?.name;

    return result;
  }

  useEffect(() => {
    async function fetchData() {
      const name = await getPhonesById();
      if (name !== undefined) {
        setProductName(name);
      }
    }

    fetchData();
  }, [product]);

  const isBreadcrumbs = (part: string) => {
    if (
      part === linkTypes.phones ||
      part === linkTypes.tablets ||
      part === linkTypes.accessories ||
      part === linkTypes.favorites
    ) {
      return part.replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());
    }

    return productName;
  };

  return (
    <div className={styles.breadcrumb__style}>
      <Link to={`/`} className={styles.home__icon}></Link>

      {parts.map((part: string, index: number) => (
        <React.Fragment key={part}>
          {index !== parts.length - 1 && (
            <Link
              to={`/${parts.slice(0, index + 1).join('/')}`}
              className={classNames({
                [styles.breadcrumbs]: index < parts.length - 1,
              })}
            >
              {index < parts.length - 1 &&
                part.replace(/\b\w/g, (firstLetter: string) => firstLetter.toUpperCase())}
            </Link>
          )}

          {index === parts.length - 1 && (
            <span
              className={classNames({
                [styles.breadcrumbs__disabled]: index === parts.length - 1,
              })}
            >
              {isBreadcrumbs(part)}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
