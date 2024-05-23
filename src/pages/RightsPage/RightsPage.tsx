import React from "react";
import { Link } from "react-router-dom";
import styles from "./rightsPage.module.scss";
import userPhoto from "./ph1.png";

export const RightsPage = () => {
  return (
    <div className={styles.rightsPage}>
      <div className={styles.photo}>
        <img src={userPhoto} alt="Rights" />
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          © [2024] [BestTeam]. All materials on this site are protected by
          copyright. Any use without permission of the copyright holder is
          prohibited. All trademarks and logos are the property of their
          respective owners. For more information, please contact{" "}
          <Link to="/contacts">Contacts</Link>
        </p>
      </div>
    </div>
  );
};
