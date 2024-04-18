import { Link } from 'react-router-dom';
import styles from './buttonFavourite.module.scss';
import { useState } from 'react';

export const ButtonFavourite = () => {
  const [selectedFavourite, setSelectedFavourite] = useState(false);

  const handleClickFavourite = () => {
    setSelectedFavourite(!selectedFavourite);
  };

  return (
    <>
      <Link
        to="#"
        className={`${styles.button} ${selectedFavourite ? styles.selected : styles.default}`}
        onClick={handleClickFavourite}
      >
      </Link>
    </>
  );
};
