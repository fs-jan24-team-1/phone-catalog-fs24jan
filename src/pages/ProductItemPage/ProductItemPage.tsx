import React, { useEffect, useState } from 'react';
import { getAccessories, getPhones, getTablets } from '../../api';
import { useParams } from 'react-router-dom';
import { ProductItemType } from '../../types/ProductItemType';
import { NotFoundPage } from '../NotFoundPage';
import { ButtonColor } from '../../components/UI/ButtonColor';
import styles from './productItemPage.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import classNames from 'classnames';
import { ButtonCapacity } from '../../components/UI/ButtonCapacity';

export const ProductItemPage = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductItemType | null>(null);
  const [selectedColor, setSelectedColor] = useState(
    product?.colorsAvailable[0],
  );
  const [selectedCapacity, setSelectedCapacity] = useState(
    product?.capacityAvailable[0],
  );

  const productCategory = products.find(
    item => item.itemId === productId,
  )?.category;
  let [items] = useState<ProductItemType[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productCategory === 'phones') {
          items = await getPhones();
        } else if (productCategory === 'tablets') {
          items = await getTablets();
        } else if (productCategory === 'accessories') {
          items = await getAccessories();
        }

        const foundProduct = items.find(item => item.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product');
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productCategory, productId]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };
  console.log(handleColorChange, selectedColor);

  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity(capacity);
  };

  return (
    <div className={styles.product__content}>
      <div className={styles.breadcrumbs__products}>
        <Breadcrumbs />
      </div>

      {product ? (
        <>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.details}>
            <div className={styles.product__images}>
              <div className={styles.product__image_column}>
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={classNames(styles.product__image_column_small, {
                      [styles.selected]: index === 0,
                    })}
                  >
                    <img
                      src={image}
                      alt={product.name}
                      className={styles.thumbnailImage}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.product__image_main}>
                {product.images.map(
                  (image, index) =>
                    index === 0 && (
                      <img
                        key={index}
                        src={image}
                        alt={product.name}
                        className={`${styles.mainImage}`}
                      />
                    ),
                )}
              </div>
            </div>

            <div className={styles.product__info}>
              <div className={styles.product__info__colors}>
                <p className={styles.product__info__colors_title}>
                  Available colors:
                </p>
                <div className={styles.product__info__colors_buttons}>
                  {product.colorsAvailable.map((color, index) => (
                    <div
                      key={index}
                      className={styles.product__info__color_button}
                    >
                      <ButtonColor colorDevice={color} />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.product__info__capacity}>
                <p className={styles.product__info__capacity_title}>
                  Select capacity:
                </p>
                <div className={styles.product__info__capacity_buttons}>
                  {product.capacityAvailable.map((capacity, index) => (
                    <div
                      key={index}
                      className={styles.product__info__capacity_button}
                    >
                      <ButtonCapacity text={capacity} />
                    </div>
                  ))}
                </div>
              </div>

              <p>
                <strong>Price:</strong> ${product.priceRegular}
              </p>
            </div>
          </div>

          <div className={styles.product__about}>
            <p>
              <strong>About:</strong>
            </p>
            {product.description.map((desc, index) => (
              <div key={index}>
                <p>
                  <strong>{desc.title}</strong>
                </p>
                <ul>
                  {desc.text.map((text, idx) => (
                    <li key={idx}>{text}</li>
                  ))}
                </ul>
              </div>
            ))}
            <p>
              <strong>Screen:</strong> {product.screen}
            </p>
            <p>
              <strong>Resolution:</strong> {product.resolution}
            </p>
            <p>
              <strong>Processor:</strong> {product.processor}
            </p>
            <p>
              <strong>RAM:</strong> {product.ram}
            </p>
            <p>
              <strong>Camera:</strong> {product.camera}
            </p>
            <p>
              <strong>Zoom:</strong> {product.zoom}
            </p>
            <p>
              <strong>Cell:</strong>
            </p>
            <ul>
              {product.cell.map((cell, idx) => (
                <li key={idx}>{cell}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};
