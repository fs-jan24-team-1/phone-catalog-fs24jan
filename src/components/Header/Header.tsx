import { Link, NavLink } from 'react-router-dom';
import styles from './header.module.scss';
import classNames from 'classnames';
import logo from '../../img/icons/Logo.svg';
import menu from '../../img/icons/menu.svg';
import cours from '../../img/icons/cours.svg';
import favorites from '../../img/icons/hearts.svg';
import { useState } from 'react';
import { NavBar } from '../NavBar/NavBar';

export const Header = () => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(2);
  const [favoritesCount, setFavoritesCount] = useState(3);

  const toggleMenu = () => {
    setIsMenuShow(!isMenuShow);
  }

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__nav_link, { [styles.is_active]: isActive });


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
              Home
            </NavLink>
            <NavLink className={getLinkClass} to="/phones">
              Phones
            </NavLink>
            <NavLink className={getLinkClass} to="/tablets">
              Tablets
            </NavLink>
            <NavLink className={getLinkClass} to="/accessories">
              Accessories
            </NavLink>
          </div>
        </nav>
      </div>

      <div className={styles.right_side}>
        <NavLink to="/Favorites" className={({ isActive }) => classNames(styles.favorites, { [styles.is_active]: isActive })}>
          <div className={styles.favoritesIconContainer}>
            <img src={favorites} alt="favorites" className={styles.favorites__logo} />
            {favoritesCount > 0 && <div className={styles.favoritesItemCount}>{favoritesCount}</div>}
          </div>
        </NavLink>

        <NavLink to="/cart" className={({ isActive }) => classNames(styles.cart, { [styles.is_active]: isActive })}>
          <div className={styles.cartIconContainer}>
            <img src={cours} alt="cart" className={styles.cart__logo} />
            {cartItemCount > 0 && <div className={styles.cartItemCount}>{cartItemCount}</div>}
          </div>
        </NavLink>

         <a className={styles.menus} onClick={toggleMenu}>
          <img src={menu} alt="menuicon" className='menus__logo' />
        </a>

        {isMenuShow && <NavBar onClose={toggleMenu}/>}
      </div>
    </div>
  );
};
