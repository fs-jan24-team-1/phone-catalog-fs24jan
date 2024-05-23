import React, { useEffect, useState } from 'react';
import styles from './productItemPage.module.scss';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { getAccessories, getPhones, getTablets } from 'api';
import { SortProductBy, ProductButtonType, Product } from 'types';
import { sortProductsBy, useScrollToTopEffect } from 'utils';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ProductItemType } from 'types';
import { NotFoundPage } from 'pages/NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { ButtonColor } from 'components/UI/ButtonColor';
import { ButtonCapacity } from 'components/UI/ButtonCapacity';
import { ButtonPrimary } from 'components/UI/ButtonPrimary';
import { ButtonFavourite } from 'components/UI/ButtonFavourite';
import { ButtonBack } from 'components/UI/ButtonBack';
import { ProductsSlider } from 'components/ProductsSlider';

export const ProductItemPage = () => {
  const [t] = useTranslation('global');
  const dispatch = useDispatch();
  const location = useLocation();
  useScrollToTopEffect();

  const products = useSelector((state: RootState) => state.product.products);
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductItemType | null>(null);
  const { pathname } = location;
  const parts = pathname.split('/').filter((part: string) => part !== '')[0];

  const [isSelectedPhoto, setIsSelectedPhoto] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.color);
  const [selectedCapacity, setSelectedCapacity] = useState(product?.capacity);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  let items: ProductItemType[] = [];

  const cart = useSelector((state: RootState) => state.product.cart);

  const SHORT_DESCRIPTION_SECTION = [
    { language: t('productPage.Screen'), value: product?.screen },
    { language: t('productPage.Resolution'), value: product?.resolution },
    { language: t('productPage.Processor'), value: product?.processor },
    { language: t('productPage.RAM'), value: product?.ram },
  ];

  const TECH_SECTION = [
    {
      language: t('productPage.Screen'),
      value: product?.screen,
      isValid: product?.screen !== undefined && product?.screen !== null,
    },
    {
      language: t('productPage.Resolution'),
      value: product?.resolution,
      isValid:
        product?.resolution !== undefined && product?.resolution !== null,
    },
    {
      language: t('productPage.Processor'),
      value: product?.processor,
      isValid: product?.processor !== undefined && product?.processor !== null,
    },
    {
      language: t('productPage.RAM'),
      value: product?.ram,
      isValid: product?.ram !== undefined && product?.ram !== null,
    },
    {
      language: t('productPage.Built in memory'),
      value: product?.capacity,
      isValid: product?.capacity !== undefined && product?.capacity !== null,
    },
    {
      language: t('productPage.Camera'),
      value: product?.camera,
      isValid: product?.camera !== undefined && product?.camera !== null,
    },
    {
      language: t('productPage.Zoom'),
      value: product?.zoom,
      isValid: product?.zoom !== undefined && product?.zoom !== null,
    },
    {
      language: t('productPage.Cell'),
      value: product?.cell,
      isValid: product?.cell !== undefined && product?.cell !== null,
    },
  ];

  const normalizedProduct = products.find(
    product => product.itemId === productId,
  );

  const isProductInCart = cart.some(
    (cartProduct: Product) => cartProduct.id === normalizedProduct?.id,
  );

  const productCategory = products.find(
    item => item.itemId === productId,
  )?.category;

  const favourites = useSelector(
    (state: RootState) => state.product.favourites,
  );

  const isProductInFavourites = favourites.some(
    (favProduct: Product) => favProduct.id === normalizedProduct?.id,
  );

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
        toast.error('Error fetching product');
      } finally {
        setIsLoading(false);
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

  const getUrlFromNewColor = (color: string) => {
    const capacity = product?.capacity.toLowerCase();
    const namespaceId = product?.namespaceId;
    let checkingColor = color;

    if (checkingColor.includes(' ')) {
      checkingColor = checkingColor.split(' ').join('-');
    }

    const newLink = `${namespaceId}-${capacity}-${checkingColor}`;
    return newLink;
  };

  const getUrlFromNewCapacity = (capacity: string) => {
    let checkingColor = product?.color;

    if (checkingColor && checkingColor.includes(' ')) {
      checkingColor = checkingColor.split(' ').join('-');
    }

    const namespaceId = product?.namespaceId;
    const checkingCapacity = capacity.toLowerCase();

    const newLink = `${namespaceId}-${checkingCapacity}-${checkingColor}`;
    return newLink;
  };

  const handlePhotoChange = (index: number) => {
    setIsSelectedPhoto(index);
  };

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
        <ButtonBack textForBackButton={t('product.Back')} />
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
                  {t('productPage.Available colors')}
                </p>

                <div className={styles.product__info__colors_buttons}>
                  {product.colorsAvailable.map((color, index) => (
                    <Link
                      to={`/${parts}/${getUrlFromNewColor(color)}`}
                      key={index}
                      className={styles.product__info__color_button}
                    >
                      <ButtonColor
                        colorDevice={color}
                        selected={selectedColor === color}
                        setSelectedColor={setSelectedColor}
                      />
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.product__info__capacity}>
                <p className={styles.product__info__capacity_title}>
                  {t('productPage.Select capacity')}
                </p>

                <div className={styles.product__info__capacity_buttons}>
                  {product.capacityAvailable.map((capacity, index) => (
                    <Link
                      to={`/${parts}/${getUrlFromNewCapacity(capacity)}`}
                      key={index}
                      className={styles.product__info__capacity_button}
                    >
                      <ButtonCapacity
                        text={capacity}
                        selected={selectedCapacity === capacity}
                        setSelectedCapacity={setSelectedCapacity}
                      />
                    </Link>
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
                    textForPrimaryButton={
                      isProductInCart
                        ? ProductButtonType.ADDED
                        : ProductButtonType.ADD
                    }
                    callback={handleAddToCart}
                  />

                  <div className={styles.product__info__price_gap}></div>

                  {normalizedProduct && (
                    <ButtonFavourite
                      product={normalizedProduct}
                      callback={handleAddToFavourites}
                    />
                  )}
                </div>
              </div>

              <div className={styles.product__info__smallDescription}>
                {SHORT_DESCRIPTION_SECTION.map((item, index) => (
                  <div key={index} className={styles.product__info__smallDescription_s}>
                    <p className={styles.product__info__smallDescription_name}>
                      {item.language}
                    </p>
                    <p className={styles.product__info__smallDescription_value}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.product__id}>
              {'ID: ' + findIdFullNumber()}
            </div>
          </div>

          <div className={styles.more_details}>
            <div className={styles.more_details__about}>
              <strong className={styles.more_details__about_strong}>
                {t('productPage.About')}
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
                {t('productPage.Tech specs')}
              </strong>

              <div className={styles.more_details__tech__smallDescription}>
                {TECH_SECTION.map(
                  (item, index) =>
                    item.isValid && (
                      <div
                        key={index}
                        className={
                          styles.more_details__tech__smallDescription_s
                        }
                      >
                        <p
                          className={
                            styles.more_details__tech__smallDescription_name
                          }
                        >
                          {item.language}
                        </p>
                        {item.value && (
                          <p
                            className={
                              styles.more_details__tech__smallDescription_value
                            }
                          >
                            {item.value}
                          </p>
                        )}
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>

          <div className={styles.slider}>
            <ProductsSlider
              title={t('home.You may also like')}
              products={sortProductsBy(products, SortProductBy.price)}
              loading={isLoading}
            />
          </div>
        </>
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};
