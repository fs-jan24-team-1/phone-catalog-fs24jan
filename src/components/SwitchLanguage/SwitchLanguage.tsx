import { useTranslation } from "react-i18next";
import styles from "./switchLanguage.module.scss";

export const SwitchLanguage = () => {
  const [, i18n] = useTranslation('global');

  const handleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={styles.container}>
      <button className={`${styles.button} ${i18n.language === 'en' ? styles.active : ''}`} onClick={() => handleLanguage('en')}>
        EN
      </button>
      <button className={`${styles.button} ${i18n.language === 'ua' ? styles.active : ''}`} onClick={() => handleLanguage('ua')}>
        UA
      </button>
    </div>
  );
};
