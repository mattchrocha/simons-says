import React, { Component } from "react";
import { Route } from "react-router-dom";
import PushButton from "../pushbutton/PushButton";
import GameService from "./GameService";
import io from "socket.io-client";
import "./game.css";
import disableScroll from "../../disablescroll";
import { OutlineButton } from "../Button/Button";

class Game extends Component {
  constructor(props) {
    super(props);
    this.service = new GameService();
    this.state = {
      room: props.room,
      players: props.players,
      isListening: false,
      game: null,
      buttons: null,
      sequence: [],
      roundSequence: [],
      remainingPlayers: props.players,
      currentPlayer: null,
      playerIndex: 0,
      nextPlayer: null,
      round: 0,
      message: "push first button of the sequence to start",
      gameEnds: false,
      gameOn: false
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
    this.socket = io('localhost:3010');

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
      if (this.state.isListening) this.play(id);
    });

    this.socket.on("request buttons", () => {
      this.requestButtons();
    });

    this.requestButtons();
  }

  startGame1 = () => {
    this.socket.emit("get start buttons");
    // this.startGame2()
  }

  startGame2 = () => {
    this.setState({gameEnds: false, gameOn: true})
    console.log("botones");
    console.log(this.state.buttons);
    disableScroll();
    setTimeout(()=>{
      this.socket.emit("start game");
      // let nextPlayer = this.state.remainingPlayers[this.state.playerIndex]
      // let round = this.state.round + 1
      // this.setState({nextPlayer, round})
      setTimeout(()=> {
        this.newRound();
      }, 4500)
    }, 500)
  }

  findNextPlayer = () => {
    let {players, round, playerIndex} = this.state
    console.log("busca el player")
    let remainingPlayers = [...this.state.remainingPlayers]
    let currentPlayer;
    if (round === 0){
      console.log("empieza de zero con el player")
      currentPlayer = players[0]
      this.setState({currentPlayer, playerIndex: 0})
    } else {
      console.log("no es ronda 0")
      let lastPlayer = players[playerIndex].toString()
      let nextIndex;
      if (remainingPlayers.indexOf(lastPlayer) > -1){
        console.log(remainingPlayers)
        console.log(remainingPlayers.includes(lastPlayer))
        console.log("el last player no fue eliminado")
        nextIndex = remainingPlayers.indexOf(lastPlayer) + 1 ;
        if (nextIndex === remainingPlayers.length) nextIndex = 0;
        currentPlayer = remainingPlayers[nextIndex];
        playerIndex = players.indexOf(currentPlayer);
        this.setState({currentPlayer, playerIndex})
      } else {
        console.log("last player SI FUE eliminado")
        let found = false
        while (!found) {
          if (playerIndex === players.length) {
            playerIndex = 0;
          }
          let thisPlayer = players[playerIndex]
          console.log("en el while",thisPlayer)
          if (remainingPlayers.includes(thisPlayer)){
            currentPlayer = thisPlayer
            this.setState({currentPlayer, playerIndex})
            found = true;
          } else {
            playerIndex++;
          }
        }
      }
    }
  }

  newRound = () => {
    this.findNextPlayer();
    console.log("NuevaRonda")
    let {round, currentPlayer} = this.state;
    round++;
    let message = "You're next"
    let content = {player: currentPlayer, message}
    let sequence = [...this.state.sequence]
    let buttons = [...this.state.buttons]
    
    buttons.splice(buttons.indexOf(this.socket.id), 1)
    
    sequence.push(buttons[Math.floor(Math.random()*buttons.length)])

    this.socket.emit("player message", {type: "next player", content});
    this.setState({sequence, round});

    setTimeout(()=> {
      this.socket.emit("feedback", { feedback: "memorize" });
    }, 2000)
    setTimeout(()=> {
      this.playSequence()
    }, 4000)
  }

  playSequence = () => {
    let sequence = [...this.state.sequence]
    let time = 850 * (sequence.length + 1.5)
    console.log("esta secuencia")
    console.log(sequence)

    sequence.forEach((id, index) => {
      setTimeout(() => {
        this.socket.emit("feedback", { id, feedback: "success" });
      }, 850 * (index + 1));
    })
    setTimeout(()=>{
      this.setState({isListening: true});
      this.socket.emit("feedback", {feedback: "repeat"})
    }, time)
  }

  play = id => {
    let { roundSequence, sequence} = this.state;
    // if (roundSequence.length === sequence.length) {
    //   round++;
    //   sequence.push(id);
    //   this.socket.emit("feedback", { id, feedback: "round" });
    //   this.setState({
    //     sequence,
    //     roundSequence: [],
    //     round,
    //     message: "new round"
    //   });
    // } 
    // else {
      roundSequence.push(id);
      if (!this.checkSequence(roundSequence, sequence)) {
        
        this.socket.emit("feedback", { id, feedback: "failure" });
        
        if (this.state.players.length === 1){
          setTimeout(()=>{
            let player = this.state.currentPlayer;
            let message = "game over!";
            let content = {player, message};
            this.socket.emit("player message", {type: "wins", content});
            setTimeout(() => {
              this.setState({gameEnds: true, gameOn: false})
              this.props.gameOver()
            }, 6000)
          },4200)
        } else {
          let {currentPlayer} = this.state;
          let remainingPlayers = [...this.state.remainingPlayers]
          remainingPlayers.splice(remainingPlayers.indexOf(currentPlayer), 1)
          let message = "has been eliminated";
          let content = {message, player: currentPlayer}
  
          this.setState({remainingPlayers, isListening: false});
          setTimeout(()=> {
            this.socket.emit("player message", {type: "player eliminated", content});
          },2100)
          if (remainingPlayers.length === 1){
            setTimeout(()=>{
              let player = remainingPlayers[0];
              let message = "wins";
              let content = {player, message};
              this.socket.emit("player message", {type: "wins", content});
              setTimeout(() => {
                this.setState({gameEnds: true, gameOn: false})
                this.props.gameOver()
              }, 6000)
            },4200)
          } else {
            
            this.setState({roundSequence: []})
            setTimeout(()=>{
              this.newRound()
            },4200)
          }
        }
        
        

      } else if (roundSequence.length === sequence.length){
        this.socket.emit("feedback", { feedback: "round" });
        this.setState({roundSequence: [], isListening: false})
        setTimeout(()=> {
          this.newRound();
        }, 3000)
      } else {
        this.socket.emit("feedback", { id, feedback: "success" });
      }
    // }
  };

  checkSequence = (roundSequence, sequence) => {
    // console.log("CHECKING IF THIS");
    // console.log(sequence[roundSequence.length - 1]);
    // console.log("EQUALS THIS");
    // console.log(roundSequence[roundSequence.length - 1]);
    return sequence[roundSequence.length - 1] ===
      roundSequence[roundSequence.length - 1]
      ? true
      : false;
  };

  componentDidUpdate = () => {
    // console.log("game component updated");
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
      mainButton = <PushButton room={this.state.room} mainGameButton={true} isConnected={true} startGame={e => this.startGame1()}/>
    }

    return mainButton;
  }
}

export default Game;
