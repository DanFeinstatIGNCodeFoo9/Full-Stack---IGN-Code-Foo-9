import React from "react";
import styles from "./Message.module.css";
import wellMet from "../../audio/wellMet.mp3";
import heyListen from "../../audio/heyListen.mp3";

const Message = props => {
  return (
    <div
      className={
        props.currentName === props.name
          ? `${styles.container} ${styles.right}`
          : styles.container
      }
    >
      {props.audio && props.message === "Well Met!" && (
        <audio src={wellMet} autoPlay />
      )}
      {props.audio && props.message === "Hey, listen!" && (
        <audio src={heyListen} autoPlay />
      )}
      {/* <div className={styles.contentContainer}> */}
      <p className={styles.text}>
        <span className={styles.name}>{props.name}</span>: {props.message}
      </p>
      {/* </div> */}
    </div>
  );
};
export default Message;
