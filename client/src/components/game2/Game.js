import React, { Component } from "react";
import { Route } from "react-router-dom";
import PushButton from "../pushbutton/PushButton";
import GameService from "./GameService";
import io from "socket.io-client";
import "./game.css";
import disableScroll from "../../disablescroll";
import dotenv from "dotenv";

class Game extends Component {
  constructor(props) {
    super(props);
    this.service = new GameService();
    this.state = {
      room: props.room,
      players: props.players,
      game: null,
      buttons: null,
      sequence: [],
      roundSequence: [],
      round: 0,
      message: "push first button of the sequence to start"
    };
  }

  newGame = name => {
    let creator = "5bbe158395b68f1bcbe52963";

    this.service
      .newGame(name, creator)
      .then(game => {
        this.setState({ game: game.name });
      })
      .catch(error => console.log(error));
  };

  requestButtons = () => {
    this.socket.emit("get buttons");
  };

  componentDidMount() {
    this.socket = io("localhost:3010");

    this.socket.on("connect", () => {
      this.socket.emit("room", this.state.room);
    });

    this.socket.on("get buttons", buttons => {
      this.setState({ buttons });
      this.props.getConnectedButtons(buttons.length);
    });

    this.socket.on("get start buttons", buttons => {
      buttons.splice(buttons.indexOf(this.socket.id), 1)
      this.setState({ buttons });
      this.startGame2();
    })

    this.socket.on("sequence", id => {
      this.play(id);
    });

    this.socket.on("request buttons", () => {
      this.requestButtons();
    });

    this.requestButtons();
  }

  startGame1 = () => {
    // this.socket.emit("get start buttons");
    this.startGame2()
  }

  startGame2 = () => {
    console.log("botones");
    console.log(this.state.buttons);
    disableScroll();
    setTimeout(()=>{
      this.socket.emit("start game");
      setTimeout(()=> {

      }, 3200)
    }, 500)
  }

  play = id => {
    let { roundSequence, sequence, round } = this.state;

    if (roundSequence.length === sequence.length) {
      round++;
      sequence.push(id);
      this.socket.emit("feedback", { id, feedback: "round" });
      this.setState({
        sequence,
        roundSequence: [],
        round,
        message: "new round"
      });
    } else {
      roundSequence.push(id);
      if (!this.checkSequence(roundSequence, sequence)) {
        this.socket.emit("feedback", { id, feedback: "failure" });
        this.setState({
          message: "you lost",
          sequence: [],
          roundSequence: [],
          round: 0
        });
      } else {
        this.socket.emit("feedback", { id, feedback: "success" });
        roundSequence.length === sequence.length
          ? this.setState({
              roundSequence,
              message: "add button to the sequence"
            })
          : this.setState({ roundSequence, message: "keep on" });
      }
    }
  };

  checkSequence = (roundSequence, sequence) => {
    console.log("CHECKING IF THIS");
    console.log(sequence[roundSequence.length - 1]);
    console.log("EQUALS THIS");
    console.log(roundSequence[roundSequence.length - 1]);
    return sequence[roundSequence.length - 1] ===
      roundSequence[roundSequence.length - 1]
      ? true
      : false;
  };

  componentDidUpdate = () => {
    console.log("game component updated");
    // console.log(this.state.buttons)
    // console.log(this.state.sequence)
    // console.log(`Round ${this.state.round}`)
    // console.log(`Round sequence: ${this.state.roundSequence}`)
    // console.log(`Total sequence: ${this.state.sequence}`)
  };

  render() {
    let displayGame = { display: "none" };
    if (this.props.displayGame) {
      displayGame = { display: "flex" };
    }
    let style = { ...displayGame };
    let mainButton = null;
    if (this.props.displayGame) {
      mainButton = <PushButton room={this.state.room} mainGameButton={true} startGame={e => this.startGame1()}/>
    }

    return mainButton;
  }
}

export default Game;
