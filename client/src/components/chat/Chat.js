import React, { Component } from "react";
import styles from "./Chat.module.css";
import genchatAPI from "../../utils/genchatAPI";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getGenchatComments();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.commentContainer}>{this.props.children}</div>
        <div className={styles.formContainer}>
          <form>
            <input
              className={styles.input}
              name="comment"
              value={this.props.comment}
              placeholder="enter message here"
              onChange={this.props.handleInputChange}
            />
            <button
              className={styles.btn}
              onClick={this.props.handleGenchatComment}
            >
              Submit
            </button>
            <button
              className={styles.btn}
              onClick={this.props.getGenchatComments}
            >
              Get It
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
