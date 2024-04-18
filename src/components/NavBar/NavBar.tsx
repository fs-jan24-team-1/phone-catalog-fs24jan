// NavBar.tsx
import { Link } from 'react-router-dom';
import styles from './navBar.module.scss';

export const NavBar = ({ onClose }: { onClose: () => void }) => {
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
              HOME
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="/phones" className={styles.nav__link} onClick={onClose}>
              PHONES
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="/tablets" className={styles.nav__link} onClick={onClose}>
              TABLETS
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="/accessories" className={styles.nav__link} onClick={onClose}>
              ACCESSORIES
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.nav__bottom}>
        <Link to="/Favorites" className={styles.nav__favorites} onClick={onClose}>
          <img src={require('../../img/icons/hearts.svg').default} alt="" />
        </Link>
        <Link to="/cart" className={styles.nav__cart} onClick={onClose}>
          <img src={require('../../img/icons/cours.svg').default} alt="" />
        </Link>
      </div>
    </aside>
  );
};
