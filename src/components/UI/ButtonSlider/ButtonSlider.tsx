import { Link } from 'react-router-dom';
import styles from './ButtonSlider.module.scss';
import { useState } from 'react';

interface ButtonSliderProps {
  iconType: 'arrowLeft' | 'arrowRight' | 'plus' | 'minus';
}

export const ButtonSlider: React.FC<ButtonSliderProps> = ({ iconType }) => {
  const [selectedSlider, setSelectedSlider] = useState(false);

  const handleClickSlider = () => {
    setSelectedSlider(!selectedSlider);
  };

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
