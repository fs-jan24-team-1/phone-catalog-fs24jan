import React from 'react';
import './loader.scss';
import styles from './loader.module.scss';

export const Loader = () => (
  <div className={styles.loader} data-cy="loader">
    <div className={styles.loader__content} />
  </div>
);
