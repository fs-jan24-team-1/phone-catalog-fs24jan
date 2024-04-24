import { Link } from "react-router-dom"
import styles from "./footer.module.scss"

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <Link to="/" className={styles.footer__logo} />

        <ul className={styles.footer__list}>
          <li className={styles.footer__item}>
            <Link to="https://github.com/fs-jan24-team-1/phone-catalog-fs24jan/tree/develop" className={styles.footer__link}>Github</Link>
          </li>

          <li className={styles.footer__item}>
            <Link to="#" className={styles.footer__link}>Contacts</Link>
          </li>

          <li className={styles.footer__item}>
            <Link to="#" className={styles.footer__link}>Rights</Link>
          </li>
        </ul>

        <div className={styles['back-to-top']}>
          <div className={styles['back-to-top__content']} onClick={handleScrollToTop}>
            <span className={styles['back-to-top__text']}>Back to top</span>

            <div className={styles['back-to-top__button']} />
          </div>
        </div>
      </div>
    </footer>
  );
};
