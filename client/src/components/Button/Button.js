import React, { Component } from "react";
import Ink from "../react-ink";
import "./button.css";

export class OutlineButton extends Component {
  
  render() {
    let message = this.props.message
    let isDisabled = this.props.isDisabled
    let style = {}
    if (isDisabled){
      style = {opacity: 0.3}
    }

    return (
      <div className="on-footer">
        <div className="bottom-message">{message}</div>
        <button className="outline-button" onClick={e => this.props.onClick()} disabled={isDisabled} style={style}>
          <Ink style={{color: "white"}}/>
          {this.props.text}
        </button>
      </div>
    );
  }
}
