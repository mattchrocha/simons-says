import React, { Component } from "react";
import "./main.css";
import Navfix from "../navfix/Navfix";
// import { CSSTransitionGroup } from 'react-transition-group'
import TodoList from "./TodoList";
import Home from "../steps/Home";
import SetRoom from "../steps/SetRoom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: "#BFACFD",
      page: "Home",
      message: ""
    };
  }
  nextPage = () => {
    if (this.state.page === "Home"){
      this.setState({page: null})
      setTimeout(()=>{
        this.setState({page: "SetRoom", backgroundColor: "#CFC18E"})
      }, 1020)
    }
    if (this.state.page === "SetRoom"){
      this.setState({page: null})
      setTimeout(()=>{
        this.setState({page: "Home", backgroundColor: "#BFACFD"})
      }, 1020)
    }
  }

  render() {
    let thisPage = () => {
      if (this.state.page === "Home") return (
        <CSSTransition timeout={{enter: 1000, exit: 900}} classNames="example" key="home1">
          <Home nextPage={e => this.nextPage()} message={this.state.message}/>
        </CSSTransition>
      )
      if (this.state.page === "SetRoom") return (
        <CSSTransition timeout={{enter: 1000, exit: 900}} classNames="example" key="home2">
          <SetRoom nextPage={e => this.nextPage()}/>
        </CSSTransition>
      )
    }


    return (
      <div className="tap-main" style={{ backgroundColor: this.state.backgroundColor}}>
        <Navfix />
        <TransitionGroup className="home-pages">
          {thisPage()}
        </TransitionGroup>
      </div>
    );
  }
}
