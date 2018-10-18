import React, { Component } from "react";
import "./main.css";
import Navfix from "../navfix/Navfix";
import Home from "../steps/Home";
import SetRoom from "../steps/SetRoom";
import SetPlayers from "../steps/SetPlayers";
import SetButtons from "../steps/SetButtons";
import OnYourMarks from '../steps/OnYourMarks';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Game from '../game2/Game'

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: "#BFACFD",
      page: "Home",
      message: "",
      gameRoom: "",
      players: [],
      game: false,
      connectedButtons: 0
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
        this.setState({page: "SetButtons", backgroundColor: "#8ECF92"})
      }, 1020)
    }
    if (this.state.page === "SetButtons"){
      this.setState({page: null})
      setTimeout(()=>{
        this.setState({page: "OnYourMarks", backgroundColor: "#CF8EA3"})
      }, 1020)
    }
  }

  getRoom = (roomName) => {
    this.setState({gameRoom: roomName})
    this.nextPage();
  }

  getPlayers = (newPlayers) => {
    let {players} = this.state;
    newPlayers.forEach(element => {
      players.push(element)
    });
    this.setState({players, game: true, message: "Connect more than 1 button"})
    this.nextPage();
  }

  getConnectedButtons = (buttons) => {
    if (buttons > 1) {
      this.setState({connectedButtons: buttons, message: ""})
    } else {
      this.setState({connectedButtons: buttons, message: "Connect more than 1 button"})
    }
  }

  render() {
    let thisPage = () => {
      if (this.state.page === "Home") return (
        <CSSTransition timeout={{enter: 1000, exit: 900}} classNames="example" key="home">
          <Home nextPage={e => this.nextPage()} message={this.state.message}/>
        </CSSTransition>
      )
      if (this.state.page === "SetRoom") return (
        <CSSTransition timeout={{enter: 1000, exit: 900}} classNames="example" key="roomsetup">
          <SetRoom getRoom={roomName => this.getRoom(roomName)}/>
        </CSSTransition>
      )
      if (this.state.page === "SetPlayers") return (
        <CSSTransition timeout={{enter: 1000, exit: 900}} classNames="example" key="players">
          <SetPlayers getPlayers={players => this.getPlayers(players)}/>
        </CSSTransition>
      )
      if (this.state.page === "SetButtons") return (
        <CSSTransition timeout={{enter: 1000, exit: 900}} classNames="example" key="buttons">
          <SetButtons roomName={this.state.gameRoom} message={this.state.message}buttonsNumber={this.state.connectedButtons} nextPage={e => this.nextPage()}/>
        </CSSTransition>
      )
      if (this.state.page === "OnYourMarks") return (
        <CSSTransition timeout={{enter: 1000, exit: 900}} classNames="example" key="onmarks">
          <OnYourMarks players={this.state.players} color="#CF8EA3" nextPage={e => this.nextPage()}/>
        </CSSTransition>
      )
    }

    let game = () => {
      if (this.state.game){
        return (<Game room={this.state.gameRoom} players={this.state.players} getConnectedButtons={buttons => this.getConnectedButtons(buttons)}/>)
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
