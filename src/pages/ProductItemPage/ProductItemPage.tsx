import React, { useEffect, useState } from 'react';
import { getAccessories, getPhones, getTablets } from '../../api';
import { useParams } from 'react-router-dom';
import { ProductItemType } from '../../types/ProductItemType';
import { NotFoundPage } from '../NotFoundPage';
import { ButtonColor } from '../../components/UI/ButtonColor';
import styles from './productItemPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import classNames from 'classnames';
import { ButtonCapacity } from '../../components/UI/ButtonCapacity';
import { ButtonPrimary } from '../../components/UI/ButtonPrimary';
import { Product } from '../../types/Product';
import { ButtonFavourite } from '../../components/UI/ButtonFavourite';
import { ButtonBack } from '../../components/UI/ButtonBack';
import { ProductButtonType } from '../../types/ProductButtonType';
import { toast } from 'react-toastify';

export const ProductItemPage = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductItemType | null>(null);
  const [isSelectedPhoto, setIsSelectedPhoto] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.color);
  const [selectedCapacity, setSelectedCapacity] = useState(product?.capacity);
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

  useEffect(() => {
    if (product && product.colorsAvailable) {
      setSelectedColor(product.color);
    }

    if (product && product.capacityAvailable) {
      setSelectedCapacity(product.capacity);
    }
  }, [product]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity(capacity);
  };

  const handlePhotoChange = (index: number) => {
    setIsSelectedPhoto(index);
  };

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.product.cart);
  const normalizedProduct = products.find(product => product.itemId === productId);

  const isProductInCart = cart.some(
    (cartProduct: Product) => cartProduct.id === normalizedProduct?.id,
  );

  const handleAddToCart = () => {
    if (isProductInCart) {
      dispatch({
        type: 'product/removeFromCart',
        payload: normalizedProduct,
      });
    } else {
      dispatch({
        type: 'product/addToCart',
        payload: normalizedProduct,
      });
    }
  };

  const favourites = useSelector((state: RootState) => state.product.favourites);
  const isProductInFavourites = favourites.some(
    (favProduct: Product) => favProduct.id === normalizedProduct?.id,
  );

  const handleAddToFavourites = () => {
    if (isProductInFavourites) {
      toast.success('The product has been removed');

      dispatch({
        type: 'product/removeFromFavourites',
        payload: normalizedProduct,
      });
    } else {
      toast.success('The product has been added');

      dispatch({
        type: 'product/addToFavourites',
        payload: normalizedProduct,
      });
    }
  };

  const findIdFullNumber = () => {
    const foundElement = products.find(element => element.itemId === productId);

    if (foundElement) {
      const idLength = foundElement.id.toString().length;
      let zeroElements = '';
      for (let i = 0; i < 8 - idLength; i++) {
        zeroElements += '0';
      }

      return zeroElements + foundElement.id;
    } else {
      return null;
    }
  };

  return (
    <div className={styles.product__content}>
      <div className={styles.breadcrumbs__products}>
        <Breadcrumbs />
      </div>

      <div className={styles.back__products}>
        <ButtonBack textForBackButton={`Back`} />
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
                      [styles.selected]: index === isSelectedPhoto,
                    })}
                    onClick={() => handlePhotoChange(index)}
                  >
                    <img
                      src={image}
                      alt={product.name}
                      className={`${styles.mainImg}`}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.product__image_main}>
                {product.images.map(
                  (image, index) =>
                    index === isSelectedPhoto && (
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
                  Available colors
                </p>
                <div className={styles.product__info__colors_buttons}>
                  {product.colorsAvailable.map((color, index) => (
                    <div
                      key={index}
                      className={styles.product__info__color_button}
                      onClick={() => handleColorChange(color)}
                    >
                      <ButtonColor
                        colorDevice={color}
                        selected={selectedColor === color}
                        setSelectedColor={setSelectedColor}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.product__info__capacity}>
                <p className={styles.product__info__capacity_title}>
                  Select capacity
                </p>
                <div className={styles.product__info__capacity_buttons}>
                  {product.capacityAvailable.map((capacity, index) => (
                    <div
                      key={index}
                      className={styles.product__info__capacity_button}
                      onClick={() => handleCapacityChange(capacity)}
                    >
                      <ButtonCapacity
                        text={capacity}
                        selected={selectedCapacity === capacity}
                        setSelectedCapacity={setSelectedCapacity}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.product__info__price}>
                <p className={styles.product__info__price_s}>
                  <strong className={styles.product__info__price_discount}>
                    ${product.priceDiscount}
                  </strong>
                  <span className={styles.product__info__price_regular}>
                    ${product.priceRegular}
                  </span>
                </p>

                <div className={styles.product__info__price_buttons}>
                  <ButtonPrimary
                    textForPrimaryButton={ProductButtonType.ADD}
                    callback={handleAddToCart}
                  />
                  <div className={styles.product__info__price_gap}></div>
                  <ButtonFavourite
                    callback={handleAddToFavourites} // щось додати у функцію
                  />
                </div>
              </div>

              <div className={styles.product__info__smallDescription}>
                <div className={styles.product__info__smallDescription_s}>
                  <p className={styles.product__info__smallDescription_name}>
                    Screen
                  </p>
                  <p className={styles.product__info__smallDescription_value}>
                    {product.screen}
                  </p>
                </div>

                <div className={styles.product__info__smallDescription_s}>
                  <p className={styles.product__info__smallDescription_name}>
                    Resolution
                  </p>
                  <p className={styles.product__info__smallDescription_value}>
                    {product.resolution}
                  </p>
                </div>

                <div className={styles.product__info__smallDescription_s}>
                  <p className={styles.product__info__smallDescription_name}>
                    Processor
                  </p>
                  <p className={styles.product__info__smallDescription_value}>
                    {product.processor}
                  </p>
                </div>

                <div className={styles.product__info__smallDescription_s}>
                  <p className={styles.product__info__smallDescription_name}>
                    RAM
                  </p>
                  <p className={styles.product__info__smallDescription_value}>
                    {product.ram}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.product__id}>
              {'ID: ' + findIdFullNumber()}
            </div>
          </div>

          <div className={styles.more_details}>
            <div className={styles.more_details__about}>
              <strong className={styles.more_details__about_strong}>
                About
              </strong>

              {product.description.map((desc, index) => (
                <div key={index} className={styles.more_details__about__info}>
                  <p className={styles.more_details__about__info__title}>
                    <strong>{desc.title}</strong>
                  </p>

                  {desc.text.map((text, indexJ) => (
                    <div
                      key={indexJ}
                      className={styles.more_details__about__info__description}
                    >
                      {text}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.more_details__tech}>
              <strong className={styles.more_details__tech_strong}>
                Tech specs
              </strong>

              <div className={styles.more_details__tech__smallDescription}>
                <div className={styles.more_details__tech__smallDescription_s}>
                  <p
                    className={styles.more_details__tech__smallDescription_name}
                  >
                    Screen
                  </p>
                  <p
                    className={
                      styles.more_details__tech__smallDescription_value
                    }
                  >
                    {product.screen}
                  </p>
                </div>

                <div className={styles.more_details__tech__smallDescription_s}>
                  <p
                    className={styles.more_details__tech__smallDescription_name}
                  >
                    Resolution
                  </p>
                  <p
                    className={
                      styles.more_details__tech__smallDescription_value
                    }
                  >
                    {product.resolution}
                  </p>
                </div>

                <div className={styles.more_details__tech__smallDescription_s}>
                  <p
                    className={styles.more_details__tech__smallDescription_name}
                  >
                    Processor
                  </p>
                  <p
                    className={
                      styles.more_details__tech__smallDescription_value
                    }
                  >
                    {product.processor}
                  </p>
                </div>

                <div className={styles.more_details__tech__smallDescription_s}>
                  <p
                    className={styles.more_details__tech__smallDescription_name}
                  >
                    RAM
                  </p>
                  <p
                    className={
                      styles.more_details__tech__smallDescription_value
                    }
                  >
                    {product.ram}
                  </p>
                </div>

                <div className={styles.more_details__tech__smallDescription_s}>
                  <p
                    className={styles.more_details__tech__smallDescription_name}
                  >
                    Built in memory
                  </p>
                  <p
                    className={
                      styles.more_details__tech__smallDescription_value
                    }
                  >
                    {product.capacity}
                  </p>
                </div>

                {product.camera && (
                  <div
                    className={styles.more_details__tech__smallDescription_s}
                  >
                    <p
                      className={
                        styles.more_details__tech__smallDescription_name
                      }
                    >
                      Camera
                    </p>
                    <p
                      className={
                        styles.more_details__tech__smallDescription_value
                      }
                    >
                      {product.camera}
                    </p>
                  </div>
                )}

                {product.zoom && (
                  <div
                    className={styles.more_details__tech__smallDescription_s}
                  >
                    <p
                      className={
                        styles.more_details__tech__smallDescription_name
                      }
                    >
                      Zoom
                    </p>
                    <p
                      className={
                        styles.more_details__tech__smallDescription_value
                      }
                    >
                      {product.zoom}
                    </p>
                  </div>
                )}

                <div className={styles.more_details__tech__smallDescription_s}>
                  <p
                    className={styles.more_details__tech__smallDescription_name}
                  >
                    Cell
                  </p>
                  <p
                    className={
                      styles.more_details__tech__smallDescription_value
                    }
                  >
                    {product.cell}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};
