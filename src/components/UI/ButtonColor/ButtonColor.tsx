/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './buttonColor.module.scss';
import { useState } from 'react';

type Props = {
  colorDevice: string;
};

export const ButtonColor: React.FC<Props> = ({ colorDevice }) => {
  const [selectedColor, setSelectedColor] = useState(false);

  const handleClickColor = () => {
    setSelectedColor(!selectedColor);
  };

  return (
    <div className={styles.color__сontainer}>
      <Link
        to="#"
        className={`
            ${styles.button}
            ${selectedColor ? styles.selected : styles.default}
          `}
        style={{ '--bg-color': colorDevice } as React.CSSProperties}
        onClick={handleClickColor}
      ></Link>
    </div>
  );
};
