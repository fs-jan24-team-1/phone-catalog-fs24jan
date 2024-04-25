import { Link } from 'react-router-dom';
import styles from './navBar.module.scss';
import { useTranslation } from 'react-i18next';
import Logo from '../../img/icons/Logo.svg';
import Close from '../../img/icons/close.svg';
import hearts from   '../../img/icons/hearts.svg';
import cours from '../../img/icons/cours.svg';

export const NavBar = ({ onClose }: { onClose: () => void }) => {
  const [t] = useTranslation('global');

  return (
    <aside className={styles.menu}>
      <div className={styles.menu__top}>
        <Link to="/" className={styles.menu__logo}>
          <img
            src={Logo}
            alt="logo"
            className={`${styles.menu__logo} ${styles.logo}`}
          />
        </Link>

        <Link to="#" className={styles.menu__close} onClick={onClose}>
          <img src={Close} alt="close" className={styles.close} />
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
            <Link
              to="/accessories"
              className={styles.nav__link}
              onClick={onClose}
            >
              {t('header.accessories')}
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.nav__bottom}>
        <Link
          to="/Favorites"
          className={styles.nav__favorites}
          onClick={onClose}
        >
          <img src={hearts} alt="" />
        </Link>
        <Link to="/cart" className={styles.nav__cart} onClick={onClose}>
          <img src={cours} alt="" />
        </Link>
      </div>
    </aside>
  );

};
