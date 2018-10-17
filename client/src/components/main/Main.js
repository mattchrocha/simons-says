import React, { Component } from "react";
import "./main.css";
import Navfix from "../navfix/Navfix";
// import { CSSTransitionGroup } from 'react-transition-group'
import TodoList from "./TodoList";
import Home from "../steps/Home";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      style: {
        backgroundColor: "#BFACFD"
      }
    };
  }

  render() {
    return (
      <div className="tap-main" style={{ ...this.state.style }}>
        <Navfix />
        <Home />
      </div>
    );
  }
}
