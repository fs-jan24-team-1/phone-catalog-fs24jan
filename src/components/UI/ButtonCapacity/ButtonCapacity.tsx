import React from 'react';
import styles from './buttonCapacity.module.scss';
import classNames from 'classnames';

type Props = {
  text: string;
  selected: boolean;
  setSelectedCapacity: (color: string) => void;
};

export const ButtonCapacity: React.FC<Props> = ({
  text,
  selected,
  setSelectedCapacity,
}) => {
  const handleClickCapacity = () => {
    setSelectedCapacity(text);
  };

  return (
    <div
      className={classNames(styles.button, {
        [styles.selected]: selected,
        [styles.default]: !selected,
      })}
      onClick={handleClickCapacity}
    >
      {text}
    </div>
  );
};
