import React, { Component } from "react";
import LogIn from "./components/logInSignUp/LogIn";
import SelectLogOrSign from "./components/logInSignUp/SelectLogOrSign";
import styles from "./App.module.css";
import userAPI from "./utils/userAPI";
import chatAPI from "./utils/chatAPI";
import io from "socket.io-client";
import { stat } from "fs";

const socket = io.connect("http://localhost:3000/");

class App extends Component {
  state = {
    userName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userId: "",
    socket: "",
    loggedIn: false,
    toDisplay: 1,
  };

  componentDidMount() {}

  componentWillUnmount() {
    localStorage.setItem("ignChatDemoJwt", null);
  }

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSignupSubmit = e => {
    e.preventDefault();
    if (!this.state.name) {
      return alert("Please enter a name.");
    } else if (!this.state.email) {
      return alert("Please enter an email address for your username");
    } else if (!this.state.password) {
      return alert("Please enter a password.");
    } else if (!this.state.confirmPassword) {
      return alert("Please confirm your password.");
    } else if (this.state.password !== this.state.confirmPassword) {
      return alert("Your passwords do not match");
    }
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    // console.log(userData);
    userAPI.signUp(userData).then(response => {
      console.log(response);
      const userInfo = {
        email: this.state.email,
        password: this.state.password,
      };

      userAPI.logIn(userInfo).then(response => {
        console.log(response);
        if (response.data.status === "error") {
          alert(response.data.message);
        } else {
          localStorage.setItem("ignChatDemoJwt", response.data.data.token);
          this.loggedIn(response.data.data.user._id);
          const socketInfo = {
            email: this.state.email,
            socketId: socket.id,
          };
          userAPI.updateSocket(socketInfo);
          this.setState({
            password: "",
            confirmPassword: "",
            loggedIn: true,
          });
        }
      });
    });
  };

  handleLogInSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    userAPI.logIn(userData).then(response => {
      console.log(response);
      if (response.data.status === "error") {
        alert(response.data.message);
      } else {
        localStorage.setItem("ignChatDemoJwt", response.data.data.token);
        this.loggedIn(response.data.data.user._id);
        const socketInfo = {
          email: this.state.email,
          socketId: socket.id,
        };
        userAPI.updateSocket(socketInfo);
      }
    });
  };

  loggedIn = name => {
    socket.emit("userLoggedIn", {
      data: { userId: name, socketId: socket.id },
    });
    console.log(`name: ${name}`);
    console.log(`socketid: ${socket.id}`);
  };

  logOut = () => {
    localStorage.setItem("ignChatDemoJwt", null);
    const userData = {
      email: this.state.email,
      socketId: "",
    };
    userAPI.updateSocket(userData);
    this.setState({
      userName: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userId: "",
      loggedIn: false,
    });
  };

  toSignUp = e => {
    e.preventDefault();
    this.setState({
      toDisplay: 2,
    });
  };
  toLogIn = e => {
    e.preventDefault();
    this.setState({
      toDisplay: 3,
    });
  };

  render() {
    return (
      <div className={styles.App}>
        {this.state.toDisplay === 1 && <SelectLogOrSign />}
        {this.state.toDisplay === 3 && (
          <LogIn
            handleInputChange={this.handleInputChange}
            handleLogInSubmit={this.handleLogInSubmit}
          />
        )}
      </div>
    );
  }
}

export default App;
