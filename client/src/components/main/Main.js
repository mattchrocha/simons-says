import React, { Component } from "react";
import "./main.css";
import Navfix from "../navfix/Navfix";
import Home from "../steps/Home";
import SetRoom from "../steps/SetRoom";
import SetPlayers from "../steps/SetPlayers";
import SetButtons from "../steps/SetButtons";
import OnYourMarks from '../steps/OnYourMarks';
import GameOver from '../steps/GameOver';
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
      connectedButtons: 0,
      displayGame: false
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

  startGame = () => {
    this.setState({page: null});
    setTimeout(()=>{
      this.setState({displayGame: true, backgroundColor: "transparent"})
    }, 1020)
  }

  gameOver = () => {
    this.setState({page: "GameOver", displayGame: false, backgroundColor: "#CF8EA3"});
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
          <OnYourMarks players={this.state.players} color="#CF8EA3" startGame={e => this.startGame()}/>
        </CSSTransition>
      )
      if (this.state.page === "GameOver") return (
        <CSSTransition timeout={{enter: 1000, exit: 900}} classNames="example" key="onmarks">
          <GameOver players={this.state.players} color="#CF8EA3" startGame={e => this.startGame()}/>
        </CSSTransition>
      )
    }

    let game = () => {
      if (this.state.game){
        return (<Game room={this.state.gameRoom} players={this.state.players} getConnectedButtons={buttons => this.getConnectedButtons(buttons)} displayGame={this.state.displayGame} gameOver={e => this.gameOver()}/>)
      }
    }


    return (
      <div className="tap-main" style={{ backgroundColor: this.state.backgroundColor}}>
        <Navfix />
        {(!this.state.displayGame) && (
          <TransitionGroup className="home-pages">
            {thisPage()}
          </TransitionGroup>
        )}
        {game()}
      </div>
    );
  }
}
