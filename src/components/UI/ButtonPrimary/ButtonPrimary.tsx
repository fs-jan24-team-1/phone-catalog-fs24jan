import { Link } from 'react-router-dom';
import styles from './buttonPrimary.module.scss';
import { useState } from 'react';

interface Props {
  textForPrimaryButton: string;
}

export const ButtonPrimary: React.FC<Props> = ({ textForPrimaryButton }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
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
