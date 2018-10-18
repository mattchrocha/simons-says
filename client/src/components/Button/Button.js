import React, { Component } from "react";
import Ink from "../react-ink";
import "./button.css";

export class OutlineButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: props.message,
      isDisabled: props.isDisabled
    }
  }
  render() {
    let style = {}
    if (this.state.isDisabled){
      style = {opacity: 0.3}
    }

    return (
      <div className="on-footer">
        <div class="bottom-message">{this.state.message}</div>
        <button className="outline-button" onClick={e => this.props.onClick()} disabled={this.state.isDisabled} style={style}>
          <Ink style={{color: "white"}}/>
          {this.props.text}
        </button>
      </div>
    );
  }
}
