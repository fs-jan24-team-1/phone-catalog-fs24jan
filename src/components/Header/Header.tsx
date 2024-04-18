import { Link, NavLink } from 'react-router-dom';
import styles from './header.module.scss';
import classNames from 'classnames';
import logo from '../../img/icons/Logo.svg';
import menu from '../../img/icons/menu.svg';
import cours from '../../img/icons/cours.svg';
import favorites from '../../img/icons/hearts.svg';
import { FC, useState } from 'react';
import { NavBar } from '../NavBar/NavBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type Props = {
  scrollToTopRef: React.RefObject<HTMLDivElement> | null;
};

export const Header: FC<Props> = ({ scrollToTopRef }) => {
  const [isMenuShow, setIsMenuShow] = useState(false);

  let favourItes = useSelector((state: RootState) => state.product.favourites);
  const favoritesCount = favourItes.length;

  let cartItes = useSelector((state: RootState) => state.product.cart);
  const cartCount = cartItes.length;

  const toggleMenu = () => {
    setIsMenuShow(!isMenuShow);
  }

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__nav_link, { [styles.is_active]: isActive });

  return (
    <div className={styles.header} ref={scrollToTopRef}>
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
            {cartCount > 0 && <div className={styles.cartItemCount}>{cartCount}</div>}
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
