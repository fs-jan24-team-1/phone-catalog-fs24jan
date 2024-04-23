/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './buttonPrimary.module.scss';
import { FC, useState } from 'react';
import classNames from 'classnames';
import { ProductButtonType } from '../../../types/ProductButtonType';

interface Props {
  textForPrimaryButton: ProductButtonType;
  callback: () => void;
}

export const ButtonPrimary: FC<Props> = ({ textForPrimaryButton, callback }) => {
  const [selected, setSelected] = useState(false);

  const getButtonClass = (buttonType: ProductButtonType) => classNames(styles.button, {
    [styles.add]: ProductButtonType.ADD === buttonType,
    [styles.added]: ProductButtonType.ADDED === buttonType,
  });

  const handleClick = () => {
    setSelected(!selected);
    callback();
  };

  return (
    <>
      <Link
        to="#"
        className={getButtonClass(textForPrimaryButton)}
        onClick={handleClick}
      >
        {textForPrimaryButton}
      </Link>
    </>
  );
};
