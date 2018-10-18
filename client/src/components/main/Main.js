import React, { Component } from "react";
import "./main.css";
import Navfix from "../navfix/Navfix";
// import { CSSTransitionGroup } from 'react-transition-group'
import TodoList from "./TodoList";
import Home from "../steps/Home";
import SetRoom from "../steps/SetRoom";
import SetPlayers from "../steps/SetPlayers";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: "#BFACFD",
      page: "Home",
      message: "",
      gameRoom: "",
      game: false
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
        this.setState({page: "SetPlayers", backgroundColor: "#ACBDFD"})
      }, 1020)
    }
    if (this.state.page === "SetPlayers"){
      this.setState({page: null})
      setTimeout(()=>{
        this.setState({page: "Home", backgroundColor: "#BFACFD"})
      }, 1020)
    }
  }

  getRoom = (roomName) => {
    this.setState({gameRoom: roomName})
    this.nextPage();
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
          <SetRoom getRoom={roomName => this.getRoom(roomName)}/>
        </CSSTransition>
      )
      if (this.state.page === "SetPlayers") return (
        <CSSTransition timeout={{enter: 1000, exit: 900}} classNames="example" key="home2">
          <SetPlayers getRoom={roomName => this.getRoom(roomName)}/>
        </CSSTransition>
      )
    }

    let game = () => {
      if (this.state.game){
        return (<Home />)
      }
    }


    return (
      <div className="tap-main" style={{ backgroundColor: this.state.backgroundColor}}>
        <Navfix />
        <TransitionGroup className="home-pages">
          {thisPage()}
        </TransitionGroup>
        {game()}
      </div>
    );
  }
}
