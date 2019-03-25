import React from "react";
import styles from "./Message.module.css";

const Message = props => {
  return (
    <div
      className={
        props.currentName === props.name
          ? `${styles.container} ${styles.right}`
          : styles.container
      }
    >
      {/* <div className={styles.contentContainer}> */}
      <p className={styles.text}>
        <span className={styles.name}>{props.name}</span>: {props.message}
      </p>
      {/* </div> */}
    </div>
  );
};
export default Message;
