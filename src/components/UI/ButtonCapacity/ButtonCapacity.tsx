import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './buttonCapacity.module.scss';
import classNames from 'classnames';

type Props = {
  text: string;
};

export const ButtonCapacity: React.FC<Props> = ({ text }) => {
  const [selected, setSelecter] = useState(false);

  return (
    <Link
      to="#"
      // className={`${styles.button} ${selected ? styles.selected : styles.default}`}
      // className={classNames({styles.button}, {selected : styles.selected, !selected : styles.default})}
      className={classNames([styles.button], {
        [styles.selected]: selected,
        [styles.default]: !selected,
      })}
      onClick={() => setSelecter(!selected)}
    >
      {text}
    </Link>
  );
};
