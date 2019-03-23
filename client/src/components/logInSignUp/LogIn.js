import React, { PureComponent } from "react";
import styles from "./LogIn.module.css";

class LogIn extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <input className={styles.name} />
        <input className={styles.email} />
        <input className={styles.password} />
        <input className={styles.checkPassword} />
        <button className={styles.backBtn} />
        <button className={styles.submitBtn} />
      </div>
    );
  }
}

export default LogIn;
