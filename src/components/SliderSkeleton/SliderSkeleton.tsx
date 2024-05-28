import Skeleton from 'react-loading-skeleton';
import styles from './sliderSkeleton.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { FC } from 'react';
import './sliderSkeleton.module.scss'

export const SliderSkeleton: FC = () => {
  return (
    <div className={styles.skeletonSlider}>
      <Skeleton className={styles.image} height={300} containerClassName={styles.skeletonSlider__container} />
    </div>
  );
};
