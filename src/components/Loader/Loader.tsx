import React from 'react';
import styles from './loader.module.scss';
import * as animationData from '../../animations/Loader.json';
import { LottieAnimation } from '../UI/LottieAnimation';

export const Loader = () => (
  <div className={styles.animation}>
    <LottieAnimation animationData={animationData} />
  </div>
);
