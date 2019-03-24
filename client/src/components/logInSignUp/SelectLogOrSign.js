import React from "react";
import styles from "./Login.module.css";

const SelectLogOrSign = props => {
  return (
    <div className={styles.container}>
      <button>Sign Up</button>
      <button>Log In</button>
    </div>
  );
};

export default SelectLogOrSign;
