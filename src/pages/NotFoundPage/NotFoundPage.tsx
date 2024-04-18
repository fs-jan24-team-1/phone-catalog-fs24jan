import React from 'react';
import { Link } from 'react-router-dom';
import styles from './notFoundPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className={styles.title}>Oops, page not found!</h1>
      <Link to="/" className={styles.button}>
        Go to homepage
      </Link>
    </div>
  );
};
