import { Link } from 'react-router-dom';
import styles from './buttonPrimary.module.scss';
import { FC } from 'react';
import classNames from 'classnames';
import { ProductButtonType } from '../../../types/ProductButtonType';

interface Props {
  textForPrimaryButton: ProductButtonType;
  callback: () => void;
}

export const ButtonPrimary: FC<Props> = ({ textForPrimaryButton, callback }) => {
  const getButtonClass = (buttonType: ProductButtonType) => classNames(styles.button, {
    [styles.checkout]: ProductButtonType.CHECKOUT === buttonType,
    [styles.default]: ProductButtonType.ADD === buttonType,
    [styles.selected]: ProductButtonType.ADDED === buttonType,
  });

  const handleClick = () => {
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
