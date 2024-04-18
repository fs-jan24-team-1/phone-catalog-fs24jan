import React from "react";
import { Link } from "react-router-dom"
import styles from "./footer.module.scss"

export const Footer = () => {
  console.log(styles);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__logo}></div>

        <ul className={styles.footer__list}>
          <li className={styles.footer__item}>
            <Link to="#" className={styles.footer__link}>Github</Link>
          </li>

          <li className={styles.footer__item}>
            <Link to="#" className={styles.footer__link}>Contacts</Link>
          </li>

          <li className={styles.footer__item}>
            <Link to="#" className={styles.footer__link}>Rights</Link>
          </li>
        </ul>

        <div className={styles['back-to-top']}>
          <span className={styles['back-to-top__text']}>Back to top</span>

          <button className={styles['back-to-top__button']}></button>
        </div>
      </div>
    </footer>
  );
};
