import { Link } from 'react-router-dom';
import styles from './buttonBack.module.scss';

type Props = {
  textForBackButton: string;
};

export const ButtonBack: React.FC<Props> = ({ textForBackButton }) => {
  return (
    <>
      <Link
        to="#"
        className={styles.button}
      >
        {textForBackButton}
      </Link>
    </>
  );
};
