import React, { Component } from "react";
import axios from "axios";

import Form from "./components/Form";

class App extends Component {
  constructor() {
    super();
    this.state = {
      url: "http://localhost:3003/login",
      alert: {
        success: false,
        message: ""
      },
      switch: false
    };
  }

  handleAlert(success, message) {
    this.setState({
      alert: {
        success,
        message
      }
    });
  }

  async loginUser(body) {
    console.log("LOGIN", body);

    try {
      const res = await axios.put(`${this.state.url}`, body);

      if (res.code === 200) {
        this.handleAlert(true, res.data.message);
        return;
      }

      this.handleAlert(
        false,
        "There was an error submitting, please try again!"
      );
    } catch (e) {
      this.handleAlert(false, e.message);
    }
  }

  async addNewUser(body) {
    console.log("create", body);
    try {
      const res = await axios.post(`${this.state.url}`, body);

      if (res.code === 201) {
        this.handleAlert(true, res.data.message);
        return;
      }

      this.handleAlert(
        false,
        "There was an error submitting, please try again!"
      );
    } catch (e) {
      this.handleAlert(false, e.message);
    }
  }

  onSwitch(e) {
    console.log("wow", this.state.switch, e.target);
    this.setState({
      switch: !this.state.switch
    });
  }

  renderAlert() {
    const alertClass = `alert ${
      this.state.alert.success ? "alert-success" : "alert-danger"
    }`;

    return this.state.alert.message ? (
      <div className={alertClass} role="alert">
        {this.state.alert.message}
      </div>
    ) : null;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.renderAlert()}
          <label className="switch">
            <input
              type="checkbox"
              onClick={this.onSwitch.bind(this)}
              value={this.state.switch}
            />
            <span className="slider round" />
          </label>
          {this.state.switch ? (
            <Form title={"Register"} submit={this.addNewUser.bind(this)} />
          ) : (
            <Form title={"Login"} submit={this.loginUser.bind(this)} />
          )}
        </header>
      </div>
    );
  }
}

export default App;
