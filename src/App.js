import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
    this.updateUser = this.updateUser.bind(this);
  }
  updateUser(user) {
    // this should update the user property on state
    this.setState({ user });
  }
  render() {
    return (
      <div className="App">
        <Header user={this.state.user} updateUser={this.updateUser} />
      </div>
    );
  }
}

export default App;
