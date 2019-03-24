import React, { PureComponent } from "react";
import styles from "./Login.module.css";

class LogIn extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <label for="name">Name</label>
        <input
          className={styles.input}
          name="name"
          type="text"
          id="name"
          placeholder="enter a username"
        />
        <label for="email">Email</label>
        <input
          className={styles.input}
          name="email"
          type="email"
          id="email"
          placeholder=" yourEmail@whatever.com"
          autoComplete="email"
        />
        <label for="email">Email</label>
        <input
          className={styles.input}
          name="password"
          type="password"
          id="login-password"
          placeholder=" ex: mypassword, 12345, admin"
          autoComplete="current-password"
        />
        <input
          className={styles.input}
          name="passwordCheck"
          type="password"
          id="verify-password"
          placeholder="enter password again"
          autoComplete="current-password"
        />
        <button className={styles.backBtn} />
        <button className={styles.submitBtn} />
      </div>
    );
  }
}

export default LogIn;
