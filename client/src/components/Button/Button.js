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

export class FilledButton extends Component {
  
  render() {
    let isDisabled = this.props.isDisabled
    let color = {color: this.props.color}
    let opacity = {}
    if (isDisabled){
      opacity = {opacity: 0.3}
    }
    let style = {...opacity,...color}


    return (
      <div className="on-footer">
        <button className="outline-button filled" onClick={e => this.props.onClick()} disabled={isDisabled} style={style}>
          <Ink style={{color: "white"}}/>
          {this.props.text}
        </button>
      </div>
    );
  }
}