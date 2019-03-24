import React from "react";
import styles from "./Chat.module.css";

const Chat = props => {
  return (
    <div className={styles.container}>
      <div className={styles.commentContainer}>{props.children}</div>
      <form>
        <input className={styles.input} />
        <button className={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default Chat;
