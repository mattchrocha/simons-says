import React, { Component } from "react";

class NewGameForm extends Component {
  constructor(){
    super();
    this.state = {
      name: ""
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    console.log(name)
    this.props.createGame(name)
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ name: value });
  }

  render() {
    return (
      <div>
        <h3>New game</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Game name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <input type="submit" value="Create game" />
        </form>

        <h1>{this.state.error ? "Error" : ""}</h1>
      </div>
    );
  }
}

export default NewGameForm;
