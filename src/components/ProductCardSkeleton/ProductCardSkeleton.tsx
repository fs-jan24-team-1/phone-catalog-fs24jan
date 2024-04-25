import Skeleton from 'react-loading-skeleton';
import styles from './productCardSkeleton.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  amount: number;
};

export const CardSkeleton: React.FC<Props> = ({ amount }) => {
  const loadCards = Array(amount).fill(1);
  return (
    <>
      {loadCards.map((_, i) => (
        <div className={styles.skeletonCard} key={i}>
          <Skeleton className={styles.image} width={206} height={170} />
          <Skeleton height={58} />
          <Skeleton height={31} />
          <div className={styles.description}>
            <Skeleton height={15} count={2} width={'40%'} containerClassName={styles.description__box} />
            <Skeleton height={15} count={2} width={'40%'} containerClassName={styles.description__box} />
            <Skeleton height={15} count={2} width={'40%'} containerClassName={styles.description__box} />

          </div>
          <Skeleton className={styles.button} height={40} />
        </div>
      ))}
    </>
  );
};
