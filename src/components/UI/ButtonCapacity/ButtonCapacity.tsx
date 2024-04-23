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
