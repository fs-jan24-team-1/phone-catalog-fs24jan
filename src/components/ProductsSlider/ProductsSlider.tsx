import { useState, useRef, useEffect, FC } from 'react';
import { Product } from 'types';
import './ProductsSlider.scss';
import { ProductCard } from 'components/ProductCard';


type Props = {
  products: Product[];
  title: string;
};

export const ProductsSlider: FC<Props> = ({ title, products }) => {
  const [activeArrowLeft, setActiveArrowLeft] = useState(false);
  const [activeArrowRight, setActiveArrowRight] = useState(true);
  const slider = useRef<HTMLUListElement>(null);
  const [sliderItemWidth, setSliderItemWidth] = useState(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);
  const [lastClickTime, setLastClickTime] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 640 && windowWidth <= 1199) {
        setSliderItemWidth(237);
      } else if (windowWidth >= 320 && windowWidth < 640) {
        setSliderItemWidth(220);
      } else {
        setSliderItemWidth(272);
      }

      if (slider.current) {
        slider.current.scrollTo(0, 0);
        setActiveArrowLeft(false);
        setActiveArrowRight(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const goLeft = () => {
    const now = new Date().getTime();
    if (now - lastClickTime < 500) {
      return;
    }
    setLastClickTime(now);

    if (slider.current) {
      setActiveArrowRight(true);
      const currentScroll = slider.current.scrollLeft;

      slider.current.scrollTo(currentScroll - sliderItemWidth - 16, 0);
      if (currentScroll - sliderItemWidth <= 0) {
        setActiveArrowLeft(false);
      }
    }
  };

  const goRight = () => {
    const now = new Date().getTime();
    if (now - lastClickTime < 500) {
      return;
    }
    setLastClickTime(now);

    if (slider.current) {
      const currentScroll = slider.current.scrollLeft;
      const maxScroll = slider.current.scrollWidth - slider.current.offsetWidth;

      slider.current.scrollTo(currentScroll + sliderItemWidth + 16, 0);
      setActiveArrowLeft(true);
      if (currentScroll + sliderItemWidth >= maxScroll) {
        setActiveArrowRight(false);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLUListElement>) => {
    setTouchPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLUListElement>) => {
    if (touchPosition === null) {
      return;
    }

    const currentX = e.touches[0].clientX;
    const diff = touchPosition - currentX;

    if (diff > 5) {
      goRight();
    }

    if (diff < -5) {
      goLeft();
    }

    setTouchPosition(null);
  };

  return (
    <div className="carousel">
      <div className="carousel__top">
        <h2 className="carousel__title">{title}</h2>

        <div className="carousel__nav">
          <button
            className="carousel__button carousel__button--left"
            type="button"
            onClick={goLeft}
            disabled={!activeArrowLeft}
            aria-label="slider move left"
          />

          <button
            className="carousel__button carousel__button--right"
            type="button"
            onClick={goRight}
            disabled={!activeArrowRight}
            aria-label="slider move right"
          />
        </div>
      </div>
      <ul
        className="carousel__cards"
        ref={slider}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};
