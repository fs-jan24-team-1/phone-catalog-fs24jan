/* eslint-disable react/react-in-jsx-scope */
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './header.module.scss';
import classNames from 'classnames';
import logo from '../../img/icons/Logo.svg';
import menu from '../../img/icons/menu.svg';
import cours from '../../img/icons/cours.svg';
import favorites from '../../img/icons/hearts.svg';
import { useState } from 'react';
import { NavBar } from '../NavBar/NavBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { SearchComponent} from '../SearchComponent/SearchComponent';
import { useTranslation } from 'react-i18next';
import { SwitchLanguage } from '../SwitchLanguage/SwitchLanguage';

export const Header = () => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [t] = useTranslation("global");

  const favourItes = useSelector((state: RootState) => state.product.favourites);
  const favoritesCount = favourItes.length;

  const cartItes = useSelector((state: RootState) => state.product.cart);
  const cartCount = cartItes.length;

  const toggleMenu = () => {
    setIsMenuShow(!isMenuShow);
  }

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__nav_link, { [styles.is_active]: isActive });

  const { pathname } = useLocation();
  const isShowSearch = pathname === '/tablets' || pathname === '/accessories' || pathname === '/phones';

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <div>
            <Link to="/">
              <img className={styles.header__img} src={logo} alt="Nice gadgets logo" />
            </Link>
          </div>
        </div>

        <nav data-cy="nav" className="navbar">
          <div className={styles.header__navbar}>
            <NavLink className={getLinkClass} to="/">
              {t("header.home")}
            </NavLink>

            <NavLink className={getLinkClass} to="/phones">
              {t("header.phones")}
            </NavLink>

            <NavLink className={getLinkClass} to="/tablets">
              {t("header.tablets")}
            </NavLink>

            <NavLink className={getLinkClass} to="/accessories">
              {t("header.accessories")}
            </NavLink>
          </div>
        </nav>
      </div>

     {false && <SwitchLanguage />}

      <div className={styles.right_side}>
        {isShowSearch && <SearchComponent />}

        <NavLink to="/Favorites" className={({ isActive }) => classNames(styles.favorites, { [styles.is_active]: isActive })}>
          <div className={styles.favoritesIconContainer}>
            <img src={favorites} alt="favorites" className={styles.favorites__logo} />

            {favoritesCount > 0 && <div className={styles.favoritesItemCount}>{favoritesCount}</div>}
          </div>
        </NavLink>

        <NavLink to="/cart" className={({ isActive }) => classNames(styles.cart, { [styles.is_active]: isActive })}>
          <div className={styles.cartIconContainer}>
            <img src={cours} alt="cart" className={styles.cart__logo} />
            {cartCount > 0 && <div className={styles.cartItemCount}>{cartCount}</div>}
          </div>
        </NavLink>

        <button className={styles.menus} onClick={toggleMenu}>
          <img src={menu} alt="menuicon" className='menus__logo' />
        </button>

        {
          isMenuShow &&
          <div className={styles.navBarWrapper}>
            <NavBar onClose={toggleMenu} />
          </div>
        }
      </div>
    </div>
  );
};
