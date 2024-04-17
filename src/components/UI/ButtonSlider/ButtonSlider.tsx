import { Link } from 'react-router-dom';
import styles from './ButtonSlider.module.scss';
import { useState } from 'react';

export const ButtonSlider = () => {
  const [selectedSlider, setSelectedSlider] = useState(false);

  const handleClickSlider = () => {
    setSelectedSlider(!selectedSlider);
  };

  const sliderExample = ['<','>','+','-'];

  return (
    <>
    {sliderExample.map(curVal =>
      <Link
        key={curVal}
        to="#"
        className={`${styles.button} ${selectedSlider ? styles.disable : styles.default}`}
        onClick={handleClickSlider}
      >
        {/* need some icon: <>+- */}
        {curVal}
      </Link>
    )}
    </>
  );
};
