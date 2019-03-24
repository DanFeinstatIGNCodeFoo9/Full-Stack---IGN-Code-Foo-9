import React, { Component } from "react";
import Chat from "./components/chat/Chat";
import Message from "./components/chat/Message";
import LogIn from "./components/logInSignUp/LogIn";
import SignUp from "./components/logInSignUp/SignUp";
import SelectLogOrSign from "./components/logInSignUp/SelectLogOrSign";
import styles from "./App.module.css";
import userAPI from "./utils/userAPI";
import chatAPI from "./utils/chatAPI";
import genchatAPI from "./utils/genchatAPI";
import io from "socket.io-client";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";
// import { stat } from "fs";

const socket = io.connect("http://localhost:3002/");

class App extends Component {
  state = {
    userName: "",
    name: "",
    email: "",
    password: "",
    verifyPassword: "",
    userId: "",
    socket: "",
    loggedIn: false,
    toDisplay: 1,
    messages: [],
    comment: "",
    chatRoom: "general",
    target: "",
  };

  componentDidMount() {
    socket.on("newGenMessage", message => {
      let genchat = [...this.state.messages];
      genchat.push(message.data.data);
      this.setState({
        messages: genchat,
      });
    });
  }

  componentWillUnmount() {
    localStorage.setItem("ignChatDemoJwt", null);
  }

  getGenchatComments = () => {
    genchatAPI.getComments(localStorage.ignChatDemoJwt).then(response => {
      const messages = response.data.reverse();

      this.setState({
        messages: messages,
      });
    });
  };

  handleGenchatComment = e => {
    e.preventDefault();
    const message = this.state.comment;
    if (message === "" || message === " ") {
      alert("please enter a message");
    } else {
      const commentData = {
        message: message,
        name: this.state.name,
        id: this.state.userId,
        date: new Date(),
      };

      const socketCommentData = {
        message: message,
        name: this.state.name,
        id: this.state.userId,
        date: new Date(),
        audio: true,
      };

      socket.emit("sendingGenMessage", { data: socketCommentData });
      genchatAPI.addComment(localStorage.ignChatDemoJwt, commentData);
      this.setState({
        comment: "",
      });
    }
  };

  handleInputChangeForChat = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (value.length > 150) {
      e.target.value = this.state[name];
      alert("150 characters reached");
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (value.length > 30) {
      e.target.value = this.state[name];
      alert("Maximum character length reached");
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleSignUpSubmit = e => {
    e.preventDefault();
    if (!this.state.name) {
      return alert("Please enter a name.");
    } else if (!this.state.email) {
      return alert("Please enter an email address for your username");
    } else if (!this.state.password) {
      return alert("Please enter a password.");
    } else if (!this.state.verifyPassword) {
      return alert("Please confirm your password.");
    } else if (this.state.password !== this.state.verifyPassword) {
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
            verifyPassword: "",
            loggedIn: true,
            toDisplay: 4,
            userId: response.data.data.user._id,
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
        this.setState({
          name: response.data.data.user.name,
          userId: response.data.data.user._id,
          password: "",
          verifyPassword: "",
          loggedIn: true,
          toDisplay: 4,
        });
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
      verifyPassword: "",
      userId: "",
      loggedIn: false,
      toDisplay: 1,
    });
  };

  //quick and dirty conditional rendering as 'page changing'.
  //A much better way to do this for more complex layouts
  // would be something like react router.

  toLanding = e => {
    e.preventDefault();
    this.setState({
      toDisplay: 1,
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

  toChat = e => {
    e.preventDefault();
    if (this.state.loggedIn) {
      this.setState({
        toDisplay: 4,
      });
    }
  };

  render() {
    return (
      <div className={styles.App}>
        {this.state.toDisplay === 1 && (
          <SelectLogOrSign toSignUp={this.toSignUp} toLogIn={this.toLogIn} />
        )}
        {this.state.toDisplay === 2 && (
          <SignUp
            back={this.toLanding}
            handleInputChange={this.handleInputChange}
            handleSignUpSubmit={this.handleSignUpSubmit}
          />
        )}
        {this.state.toDisplay === 3 && (
          <LogIn
            back={this.toLanding}
            handleInputChange={this.handleInputChange}
            handleLogInSubmit={this.handleLogInSubmit}
          />
        )}
        {this.state.toDisplay === 4 && (
          <Chat
            comment={this.state.comment}
            getGenchatComments={this.getGenchatComments}
            handleInputChange={this.handleInputChangeForChat}
            handleGenchatComment={this.handleGenchatComment}
          >
            {this.state.messages.map((value, index) => {
              return (
                <Message
                  key={index}
                  name={value.name}
                  message={value.message}
                  color={"blue"}
                />
              );
            })}
          </Chat>
        )}
      </div>
    );
  }
}

export default App;
