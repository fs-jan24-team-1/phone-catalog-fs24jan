import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';
import { getPhones, getTablets, getAccessories } from '../../api';
import classNames from 'classnames';

enum linkTypes {
  phones = 'phones',
  tablets = 'tablets',
  accessories = 'accessories',
  favorites = 'Favorites',
}

export const Breadcrumbs = () => {
  const location = useLocation();
  const { pathname } = location;
  const parts = pathname.split('/').filter((part: string) => part !== '');

  const [productName, setProductName] = useState('');
  const { productId } = useParams();

  async function getPhonesById() {
    let devices = [];

    switch (parts[0]) {
      case 'phones':
        devices = await getPhones();
        break;
      case 'tablets':
        devices = await getTablets();
        break;
      case 'accessories':
        devices = await getAccessories();
        break;
      default:
        return 'Error: Not found the link path';
    }

    const result = devices.find(device => device.id === productId);

    return result?.name;
  }

  useEffect(() => {
    async function fetchData() {
      const name = await getPhonesById();
      if (name !== undefined) {
        setProductName(name);
      }
    }

    fetchData();
  }, []);

  const isBreadcrumbs = (part: string) => {
    if (
      part === linkTypes.phones ||
      part === linkTypes.tablets ||
      part === linkTypes.accessories ||
      part === linkTypes.favorites
    ) {
      return part.replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());
    }

    return productName;
  };

  return (
    <div className={styles.breadcrumb__style}>
      <Link to={`/`} className={styles.home__icon}></Link>

      {parts.map((part: string, index: number) => (
        <React.Fragment key={part}>
          {index !== parts.length - 1 && (
            <Link
              to={`/${parts.slice(0, index + 1).join('/')}`}
              className={classNames({
                [styles.breadcrumbs]: index < parts.length - 1,
              })}
            >
              {index < parts.length - 1 &&
                part.replace(/\b\w/g, (firstLetter: string) => firstLetter.toUpperCase())}
            </Link>
          )}

          {index === parts.length - 1 && (
            <span
              className={classNames({
                [styles.breadcrumbs__disabled]: index === parts.length - 1,
              })}
            >
              {isBreadcrumbs(part)}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
