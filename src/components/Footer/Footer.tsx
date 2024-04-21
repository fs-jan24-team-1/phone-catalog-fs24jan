import React from "react";
import { Link } from "react-router-dom"
import styles from "./footer.module.scss"
import { MessageContainer } from "./../UI/MessageNotification";
import { toast } from "react-toastify";

type Props = {
  scrollToTopRef: React.RefObject<HTMLDivElement> | null;
};

export const Footer: React.FC<Props> = ({ scrollToTopRef }) => {

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <Link to="/" className={styles.footer__logo} />

        <ul className={styles.footer__list}>
          <li className={styles.footer__item}>
            <Link to="#" className={styles.footer__link} onClick={() => toast.warning("Something went wrong")}>Github</Link>
          </li>

          <li className={styles.footer__item} onClick={() => toast.error("Something went wrong")}>
            <Link to="#" className={styles.footer__link}>Contacts</Link>
          </li>

          <li className={styles.footer__item} onClick={() => toast.success("Product added to cart")}>
            <Link to="#" className={styles.footer__link}>Rights</Link>
            <MessageContainer />
          </li>
        </ul>

        <div className={styles['back-to-top']}>
          <div className={styles['back-to-top__content']} onClick={
            () => scrollToTopRef?.current?.scrollIntoView({ behavior: 'smooth' })
          }>
            <span className={styles['back-to-top__text']}>Back to top</span>

            <div className={styles['back-to-top__button']} />
          </div>
        </div>
      </div>
    </footer>
  );
};
