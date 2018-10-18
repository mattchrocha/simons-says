import React, { Component } from "react";
import "./main.css";
import Navfix from "../navfix/Navfix";
// import { CSSTransitionGroup } from 'react-transition-group'
import TodoList from "./TodoList";
import Home from "../steps/Home";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      style: {
        backgroundColor: "#BFACFD"
      },
      page: "Home1"
    };
  }
  nextPage = () => {
    if (this.state.page === "Home1"){
      this.setState({page: null})
      setTimeout(()=>{
        this.setState({page: "Home2"})
      }, 1000)
    }
    if (this.state.page === "Home2"){
      this.setState({page: null})
      setTimeout(()=>{
        this.setState({page: "Home1"})
      }, 1000)
    }
  }

  render() {
    let thisPage = () => {
      if (this.state.page === "Home1") return (
        <CSSTransition timeout={{enter: 1000, exit: 1000}} classNames="example" key="home1">
          <Home nextPage={e => this.nextPage()} />
        </CSSTransition>
      )
      if (this.state.page === "Home2") return (
        <CSSTransition timeout={{enter: 1000, exit: 1000}} classNames="example" key="home2">
          <Home nextPage={e => this.nextPage()}/>
        </CSSTransition>
      )
    }


    return (
      <div className="tap-main" style={{ ...this.state.style }}>
        <Navfix />
        <TransitionGroup className="home-pages">
          {thisPage()}
        </TransitionGroup>
      </div>
    );
  }
}
