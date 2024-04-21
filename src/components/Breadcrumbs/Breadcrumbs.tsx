import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const location = useLocation();
  const { pathname } = location;

  const parts = pathname.split('/').filter(part => part !== '');

  return (
    <div className={styles.breadcrumb__style}>
      <Link to={`/`} className={styles.home__icon}></Link>
      {parts.map((part, index) => (
        <Link
          key={part}
          to={`/${parts.slice(0, index + 1).join('/')}`}
          className={styles.breadcrumbs}
        >
          {`${part[0].toUpperCase()}${part.slice(1)}`}
        </Link>
      ))}
    </div>
  );
};
