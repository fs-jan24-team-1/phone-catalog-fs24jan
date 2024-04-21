import { Link } from 'react-router-dom';
import styles from './buttonSlider.module.scss';
import React, { useState } from 'react';

interface ButtonSliderProps {
  iconType: 'arrowLeft' | 'arrowRight' | 'plus' | 'minus';
  onClick?: () => void;
}

export const ButtonSlider: React.FC<ButtonSliderProps> = ({ iconType, onClick }) => {
  const [selectedSlider, setSelectedSlider] = useState(false);

  const handleClickSlider = () => {
    setSelectedSlider(!selectedSlider);
    if (onClick) onClick();
  }

  return (
    <>
      <Link
        to="#"
        className={`${styles.button} ${selectedSlider ? styles.disable : styles.default}`}
        onClick={handleClickSlider}
      >
        <div
          className={`${styles.icon} ${selectedSlider ? styles[iconType] : `${styles[iconType]} ${styles.disable}`}`}
        />
      </Link>
    </>
  );
};
