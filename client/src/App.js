import React, { Component } from "react";
import LogIn from "./components/logInSignUp/LogIn";
import styles from "./App.module.css";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <LogIn />
      </div>
    );
  }
}

export default App;
