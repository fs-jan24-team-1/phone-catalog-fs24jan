import { Link } from 'react-router-dom';
import styles from './buttonFavourite.module.scss';
import { useState } from 'react';

interface Props {
  callback: () => void;
}
export const ButtonFavourite: React.FC<Props> = ({ callback }) => {
  const [selectedFavourite, setSelectedFavourite] = useState(false);

  const handleClickFavourite = () => {
    setSelectedFavourite(!selectedFavourite);
    callback();
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
