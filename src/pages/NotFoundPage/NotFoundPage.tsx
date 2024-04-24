import { Link } from 'react-router-dom';
import styles from './notFoundPage.module.scss';
import { useScrollToTopEffect } from '../../utils/useScrollToTopEffect';

export const NotFoundPage = () => {
  useScrollToTopEffect();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Oops, page not found!</h1>
      <Link to="/" className={styles.button}>
        Go to homepage
      </Link>
    </div>
  );
};
