import { Link } from 'react-router-dom';
import styles from './buttonPrimary.module.scss';
import { FC, useState } from 'react';
import { MessageContainer } from "./../../UI/MessageNotification";
import { toast } from "react-toastify";

interface Props {
  textForPrimaryButton: string;
  callback: () => void;
}

export const ButtonPrimary: FC<Props> = ({ textForPrimaryButton, callback }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    callback();
  };

  return (
    <>
      <Link
        to="#"
        className={`${styles.button} ${selected ? styles.selected : styles.default}`}
        onClick={handleClick}
      >
        {/* <span onClick={() => toast.success("Product added to cart")}>{textForPrimaryButton}</span> */}
        {textForPrimaryButton}
      </Link>
      <MessageContainer />
    </>
  );
};
