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
          <Skeleton className={styles.image} height={196} containerClassName={styles.skeletonCard__container} />
          <Skeleton height={58} containerClassName={styles.skeletonCard__container}/>
          <Skeleton height={31} containerClassName={styles.skeletonCard__container}/>
          <Skeleton className={styles.description} height={15} count={3} containerClassName={styles.skeletonCard__container}/>
          <Skeleton className={styles.button} height={40} containerClassName={styles.skeletonCard__container} />
        </div>
      ))}
    </>
  );
};
