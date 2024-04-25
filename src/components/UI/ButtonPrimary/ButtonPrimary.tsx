import styles from './buttonPrimary.module.scss';
import { FC } from 'react';
import classNames from 'classnames';
import { ProductButtonType } from '../../../types/ProductButtonType';

interface Props {
  textForPrimaryButton: ProductButtonType;
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonPrimary: FC<Props> = ({
  textForPrimaryButton,
  callback,
}) => {
  const getButtonClass = (buttonType: ProductButtonType) =>
    classNames(styles.button, {
      [styles.checkout]: ProductButtonType.CHECKOUT === buttonType,
      [styles.default]: ProductButtonType.ADD === buttonType,
      [styles.selected]: ProductButtonType.ADDED === buttonType,
    });

  return (
    <button className={getButtonClass(textForPrimaryButton)} onClick={callback}>
      {textForPrimaryButton}
    </button>
  );
};
