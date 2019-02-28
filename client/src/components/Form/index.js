import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="flex-container">
        <h1>{this.props.title}</h1>
        <label>NAME</label>
        <input
          type="text"
          name="username"
          className="col-sm"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <label>EMAIL</label>
        <input
          type="text"
          name="email"
          className="col-sm"
          placeholder="alex@example.com"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label>PASSWORD</label>
        <input
          type="password"
          name="password"
          className="col-sm"
          value={this.state.password}
          onChange={this.handleChange}
        />

        <input type="submit" value="SUBMIT" />
      </form>
    );
  }
}

export default Form;
