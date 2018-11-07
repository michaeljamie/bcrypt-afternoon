import React, { Component } from "react";
import "./Header.css";
import axios from "axios";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isAdmin: false
    };
  }
  handleUsernameInput(e) {
    // should update this.state.username  based on user input. Do not mutate state, use setState.
    this.setState({ username: e.target.value });
  }
  handlePasswordInput(e) {
    // should update this.state.password based on user input. Do not mutate state, use setState.
    this.setState({ password: e.target.value });
  }

  toggleAdmin() {
    // should toggle the value of isAdmin on state, by setting it to the value of it's opposite. (!this.state.isAdmin)
    this.setState({ isAdmin: !this.state.isAdmin });
  }

  login() {
    // create POST request to login endpoint
    const { username, password, isAdmin } = this.state;
    axios
      .post("/auth/login", {
        username: username,
        password: password,
        isAdmin: isAdmin
      })
      .then(response => {
        console.log(response.data);
        this.setState({ username: "", password: "", isAdmin: false });
        this.props.updateUser({ username, password, isAdmin });
      });
  }

  register() {
    // create POST request to register new user
    const { username, password, isAdmin } = this.state;
    axios
      .post("/auth/register", {
        username: this.state.username,
        password: this.state.password,
        isAdmin: this.state.isAdmin
      })
      .then(response => {
        console.log(response.data);
        this.setState({ username: "", password: "", isAdmin: false });
        this.props.updateUser({ username, password, isAdmin });
      });
  }

  logout() {
    // GET request to logout
  }

  render() {
    const { username, password } = this.state;
    const { user } = this.props;
    return (
      <div className="Header">
        <div className="title">Dragon's Lair</div>
        {user.username ? (
          <div className="welcomeMessage">
            <h4>{user.username}, welcome to the dragon's lair</h4>
            <button type="submit" onClick={this.logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="loginContainer">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => this.handleUsernameInput(e)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => this.handlePasswordInput(e)}
            />
            <div className="adminCheck">
              <input type="checkbox" id="adminCheckbox" /> <span> Admin </span>
            </div>
            <button onClick={this.login}>Log In</button>
            <button onClick={this.register} id="reg">
              Register
            </button>
          </div>
        )}
      </div>
    );
  }
}
