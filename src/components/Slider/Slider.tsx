import React, { useState, useEffect, useRef } from 'react';
import styles from './slider.module.scss';
import classNames from 'classnames';

const images = [
  require('./img/banner-phones.png'),
  require('./img/banner-tablets.png'),
  require('./img/banner-accessories.png'),
];

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const lastIndex = images.length - 1;
  const banner = useRef<HTMLDivElement>(null);
  const transformValue = sliderWidth * currentIndex;

  useEffect(() => {
    if (banner.current) {
      setSliderWidth(banner.current.offsetWidth);
    }
  }, [currentIndex]);

  const handlePrevSlide = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(lastIndex);
    }
  };

  const handleNextSlide = () => {
    if (currentIndex !== lastIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(timerId);
  }, [currentIndex]);

  return (
    <section className={styles.carousel}>
      <div className={styles.carousel__slider}>
        <button
          type="button"
          aria-label="button"
          className={classNames(styles['carousel__slider-button'], styles['carousel__slider-button-left'])}
          onClick={handlePrevSlide}
        >
          <div className={classNames(styles.icon, styles['icon-left'])} />
        </button>

        <div className={styles['carousel__slider-container']} ref={banner}>
          <ul
            className={styles['carousel__slider-list']}
            style={{
              transform: `translateX(${-transformValue}px)`,
            }}
          >
            {images.map((image, index) => (
              <li key={index} className={styles['carousel__slider-item']}>
                <img
                  src={image}
                  alt="Banner"
                  className={styles['carousel__slider-image']}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          aria-label="button"
          className={classNames(styles['carousel__slider-button'], styles['carousel__slider-button-right'])}
          onClick={handleNextSlide}
        >
          <div className={classNames(styles.icon, styles['icon-right'])} />
        </button>
      </div>

      <div className={styles['carousel__dots']}>
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label="dots"
            className={classNames(styles['carousel__dots-item'], {
              [styles['banner-active']]: currentIndex === index,
            })}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
