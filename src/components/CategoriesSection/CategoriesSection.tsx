import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './categoriesSection.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Product, Category } from 'types';
import { useTranslation } from 'react-i18next';
import phone from './img/Phone.png';
import tablet from './img/Tablet.png';
import accessory from './img/Accessories.png';
import { motion } from 'framer-motion';
import { titleVariants } from 'utils/titleVariants';
import useInViewOnce from 'hooks/useInViewOnce';

export const CategoriesSection: FC = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const [t] = useTranslation('global');
  const [ ref, inView ] = useInViewOnce({ threshold: 0 });

  const phones = products.filter(
    (product: Product) => product.category === Category.phones,
  );

  const tablets = products.filter(
    (product: Product) => product.category === Category.tablets,
  );

  const accessories = products.filter(
    (product: Product) => product.category === Category.accessories,
  );

  const categories = [
    {
      name: t('categories.Mobile phones'),
      totalQuantity: phones.length,
      image: phone,
      backgroundColor: 'violet-background',
      url: '/phones',
    },
    {
      name: t('categories.Tablets'),
      totalQuantity: tablets.length,
      image: tablet,
      backgroundColor: 'grey-background',
      url: '/tablets',
    },
    {
      name: t('categories.Accessories'),
      totalQuantity: accessories.length,
      image: accessory,
      backgroundColor: 'burgundy-background',
      url: '/accessories',
    },
  ];

  return (
    <section className={styles.category}>
      <motion.h1
        className={styles.category__title}
        variants={titleVariants}
        ref={ref}
        initial={!inView ? 'visible' : 'initial'}
        animate={inView ? 'visible' : 'initial'}
      >
        {t('home.Shop by category')}
      </motion.h1>

      <div className={styles.category__container}>
        {categories.map(category => (
          <Link
            to={category.url}
            key={category.name}
            className={styles.category__link}
          >
            <article className={styles.category__type}>
              <div
                className={`${styles.category__photo__container} ${styles[category.backgroundColor]}`}
              >
                <img
                  className={styles.category__photo}
                  src={category.image}
                  alt={category.name}
                />
              </div>

              <h3 className={styles.category__name}>{category.name}</h3>

              <p
                className={styles.category__quantity}
              >{`${category.totalQuantity} ${t('categories.models')}`}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};
