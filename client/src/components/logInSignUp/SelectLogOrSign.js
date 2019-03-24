import React from "react";
import styles from "./Select.module.css";

const SelectLogOrSign = props => {
  return (
    <div className={styles.container}>
      <div ClassName={styles.btnContainer}>
        <button className={styles.btn}>Sign Up</button>
      </div>
      <div ClassName={styles.btnContainer}>
        <button className={styles.btn}>Log In</button>
      </div>
    </div>
  );
};

export default SelectLogOrSign;
