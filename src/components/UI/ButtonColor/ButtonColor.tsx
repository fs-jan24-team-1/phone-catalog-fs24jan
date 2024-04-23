import { Link } from 'react-router-dom';
import styles from './buttonColor.module.scss';
type Props = {
  colorDevice: string;
  selected: boolean;
  setSelectedColor: (color: string) => void;
};

export const ButtonColor: React.FC<Props> = ({ colorDevice, selected, setSelectedColor }) => {
  const handleClickColor = () => {
    setSelectedColor(colorDevice);
  };

  return (
    <div className={styles.color__сontainer}>
      <Link
        to="#"
        className={`
            ${styles.button}
            ${selected ? styles.selected : styles.default}
          `}
        style={{ '--bg-color': colorDevice } as React.CSSProperties}
        onClick={handleClickColor}
      ></Link>
    </div>
  );
};
