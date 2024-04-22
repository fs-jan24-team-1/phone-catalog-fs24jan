import React from 'react';
import { Link } from 'react-router-dom';
import styles from './buttonSlider.module.scss';

interface ButtonSliderProps {
  iconType: 'arrowLeft' | 'arrowRight' | 'plus' | 'minus';
  active?: boolean;
  handleClick?: () => void;
  disabled?: boolean;
}

export const ButtonSlider: React.FC<ButtonSliderProps> = ({ iconType, active, handleClick, disabled }) => {
  const buttonContent = (
    <div
      className={`${styles.icon} ${active ? styles[iconType] : `${styles[iconType]} ${styles.disable}`}`}
    />
  );

  if (disabled) {
    return (
      <span className={`${styles.button} ${styles.disable}`}>
        {buttonContent}
      </span>
    );
  }

  return (
    <Link
      to="#"
      className={`${styles.button} ${active ? styles.disable : styles.default}`}
      onClick={handleClick}
    >
      {buttonContent}
    </Link>
  );
};

