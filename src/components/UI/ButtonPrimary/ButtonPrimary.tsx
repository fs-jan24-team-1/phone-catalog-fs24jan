/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './buttonPrimary.module.scss';
import { useState } from 'react';

interface Props {
  textForPrimaryButton: string;
  callback: () => void;
}

export const ButtonPrimary: React.FC<Props> = ({ textForPrimaryButton, callback }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    callback();
  };

  return (
    <Link
      to="#"
      className={`${styles.button} ${selected ? styles.selected : styles.default}`}
      onClick={handleClick}
    >
      {textForPrimaryButton}
    </Link>
  );
};
