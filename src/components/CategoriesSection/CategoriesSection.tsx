import { Link } from 'react-router-dom';
import styles from './categoriesSection.module.scss';
import phone from './img/Phone.png';
import tablet from './img/Tablet.png';
import accessory from './img/Accessories.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Product } from '../../types/Product';
import { Category } from '../../types/Category';

export const CategoriesSection: React.FC = () => {
  const products = useSelector((state: RootState) => state.product.products);

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
      name: 'Mobile phones',
      totalQuantity: phones.length,
      image: phone,
      backgroundColor: 'violet-background',
      url: '/phones',
    },
    {
      name: 'Tablets',
      totalQuantity: tablets.length,
      image: tablet,
      backgroundColor: 'grey-background',
      url: '/tablets',
    },
    {
      name: 'Accessories',
      totalQuantity: accessories.length,
      image: accessory,
      backgroundColor: 'burgundy-background',
      url: '/accessories',
    },
  ];

  return (
    <section className={styles.category}>
      <h1 className={styles.category__title}>Shop by category</h1>
      <div className={styles.category__container}>
        {categories.map(category => (
          <Link to={category.url} key={category.name} className={styles.category__link}>
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
              >{`${category.totalQuantity} models`}</p>
            </article>
            </Link>
        ))}
      </div>
    </section>
  );
};
