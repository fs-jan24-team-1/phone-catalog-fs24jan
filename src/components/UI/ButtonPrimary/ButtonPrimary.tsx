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
    [styles.default]: ProductButtonType.ADD === buttonType,
    [styles.selected]: ProductButtonType.ADDED === buttonType,
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
        // className={classNames([styles.button])}
        onClick={handleClick}
      >
        {textForPrimaryButton}
      </Link>
    </>
  );
};
