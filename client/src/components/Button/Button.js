import React, { Component } from "react";
import Ink from "../react-ink";
import "./button.css";

export class OutlineButton extends Component {
  render() {
    return (
      <div className="on-footer">
        <div class="bottom-message">This is a message</div>
        <button className="outline-button" onClick={e => this.props.onClick()}>
          <Ink />
          {this.props.text}
        </button>
      </div>
    );
  }
}
