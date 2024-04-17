import { Link } from 'react-router-dom';
import styles from './ButtonPrimary.module.scss';
import { useState } from 'react';

export const ButtonPrimary = () => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <Link
      to="#"
      className={`${styles.button} ${selected ? styles.selected : styles.default}`}
      onClick={handleClick}
    ></Link>
  );
};
