/* eslint-disable @typescript-eslint/no-var-requires */
// NavBar.tsx
import { Link } from 'react-router-dom';
import styles from './navBar.module.scss';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export const NavBar = ({ onClose }: { onClose: () => void }) => {
  const [t] = useTranslation("global");

  const favourItes = useSelector((state: RootState) => state.product.favourites);
  const favoritesCount = favourItes.length;

  const cartItes = useSelector((state: RootState) => state.product.cart);
  const cartCount = cartItes.length;

  return (
    <aside className={styles.menu}>
      <div className={styles.menu__top}>
        <Link to="/" className={styles.menu__logo}>
          <img src={require('../../img/icons/Logo.svg').default} alt="logo" className={`${styles.menu__logo} ${styles.logo}`} />
        </Link>

        <Link to="#" className={styles.menu__close} onClick={onClose}>
          <img src={require('../../img/icons/close.svg').default} alt="close" className={styles.close} />
        </Link>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <Link to="/" className={styles.nav__link} onClick={onClose}>
              {t('header.home')}
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="/phones" className={styles.nav__link} onClick={onClose}>
              {t('header.phones')}
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="/tablets" className={styles.nav__link} onClick={onClose}>
              {t('header.tablets')}
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="/accessories" className={styles.nav__link} onClick={onClose}>
              {t('header.accessories')}
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.nav__bottom}>
        <Link to="/Favorites" className={styles.nav__favorites} onClick={onClose}>
          <div className={styles.cartIconContainer}>
            <img src={require('../../img/icons/hearts.svg').default} alt="" className={styles.nav__icons} />
            {favoritesCount > 0 && <div className={styles.favoritesItemCount}>{favoritesCount}</div>}

          </div>

        </Link>
        <Link to="/cart" className={styles.nav__cart} onClick={onClose}>
          <div className={styles.cartIconContainer}>

            <img src={require('../../img/icons/cours.svg').default} alt="" className={styles.nav__icons} />
            {cartCount > 0 && <div className={styles.favoritesItemCount}>{cartCount}</div>}
          </div>

        </Link>
      </div>
    </aside>
  );
};
