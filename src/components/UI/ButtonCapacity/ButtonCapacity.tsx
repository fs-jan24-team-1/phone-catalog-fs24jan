import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './buttonCapacity.module.scss';

type Props = {
  text: string;
};

export const ButtonCapacity: React.FC<Props> = ({ text }) => {
  const [selected, setSelecter] = useState(false);

  return (
    <Link
      to="#"
      className={`${styles.button} ${selected ? styles.selected : styles.default}`}
      onClick={() => setSelecter(!selected)}
    >
      {text}
    </Link>
  );
};
