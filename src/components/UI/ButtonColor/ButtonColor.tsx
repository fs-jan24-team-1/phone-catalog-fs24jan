import { Link } from 'react-router-dom';
import styles from './ButtonColor.module.scss';
import { useState } from 'react';

export const ButtonColor = () => {
  const [selectedColor, setSelectedColor] = useState(false);

  const handleClickColor = () => {
    setSelectedColor(!selectedColor);
  };

  const ColorExample = ["black", "brown", "green", "yellow", "white", "purple", "red"];

  return (
    <div className={styles.color__сontainer}>
      {ColorExample.map(curVal =>
        <Link
          key={curVal}
          to="#"
          className={`
            ${styles.button}
            ${selectedColor ? styles.selected : styles.default}
            ${styles[curVal]}
          `}
          onClick={handleClickColor}
        >
        </Link>
      )}
    </div>
  );
};
