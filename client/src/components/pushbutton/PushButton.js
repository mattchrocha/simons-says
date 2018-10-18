import React from "react";
import io from "socket.io-client";
import "./pushbutton.css";
import generateGradient from "./scripts.js";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Ink from "../react-ink"

export default class PushButton extends React.Component {
  constructor(props) {
    console.log("prueba");
    console.log(props);
    super(props);
    this.state = {
      room: props.room,
      id: null,
      bgcolor: generateGradient(),
      mainGameButton: props.mainGameButton,
      bigMessage: "",
      userMessage: null
      // buttonid: props.match.params.id
    };
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on("connect", () => {
      this.socket.emit("room", this.state.room);
      this.setState({ id: this.socket.id });
    });

    this.socket.on("feedback", feedback => {
      if (feedback === "failure") this.onWrong();
      if (feedback === "success") this.onSuccess();
      if (feedback === "round") this.onRound();
      if (feedback === "start") this.newGame();
      if (feedback === "memorize") this.memorize();
      if (feedback === "repeat") this.repeat();
    });

    this.socket.on("player message", feedback => {
      if (feedback.type === "next player") this.nextPlayer(feedback.content);
      if (feedback.type === "player eliminated") this.playerEliminated(feedback.content);
      if (feedback.type === "wins") this.playerWins(feedback.content);
    });

    if (this.state.mainGameButton) {
      this.props.startGame();
    }
  }

  nextPlayer = ({player, message}) => {
    this.setState({userMessage: {player, message}})
    this.onSuccess()
    setTimeout(() => {
      this.setState({userMessage: null})
    }, 1000)
  }

  playerEliminated = ({player, message}) => {
    this.setState({userMessage: {player, message}})
    this.onFailure()
    setTimeout(() => {
      this.setState({userMessage: null})
    }, 1000)
  }

  playerWins = ({player, message}) => {
    this.setState({userMessage: {player, message}})
    this.onGreen()
    setTimeout(() => {
      this.onGreen()
    }, 800)
    setTimeout(() => {
      this.setState({userMessage: null})
    }, 4000)
  }

  onWrong = () => {
    this.setState({ bigMessage: "FAIL!" });
    this.onFailure();
    setTimeout(() => {
      this.setState({ bigMessage: ""})
    }, 1000)
  }

  onRound = () => {
    this.setState({ bigMessage: "ROUND COMPLETE" });
    this.onGreen();
    setTimeout(() => {
      this.setState({ bigMessage: ""})
    }, 1000)
  }

  memorize = () => {
    this.setState({ bigMessage: "MEMORIZE THE CODE" });
    this.onSuccess();
    setTimeout(() => {
      this.setState({ bigMessage: ""})
    }, 1000)
  }

  memorize = () => {
    this.setState({ bigMessage: "REPEAT THE CODE" });
    this.onSuccess();
    setTimeout(() => {
      this.setState({ bigMessage: ""})
    }, 1000)
  }


  newGame = () => {
    let screenbutton = document.getElementsByClassName("screenbutton")[0];
    screenbutton.setAttribute("style", "background-color: #FF5A5A; opacity: 1");
    this.setState({ bigMessage: "READY" });
    setTimeout(() => {
      screenbutton.setAttribute(
        "style",
        `transition: background-color 1s, opacity 1s; background-color: ${
          this.state.bgcolor
        }`
      );
      setTimeout(() => {
        screenbutton.setAttribute(
          "style",
          "background-color: #FF5A5A; opacity: 1"
        );
        this.setState({ bigMessage: "STEADY" });
        setTimeout(() => {
          screenbutton.setAttribute(
            "style",
            `transition: background-color 1s, opacity 1s; background-color: ${
              this.state.bgcolor
            }`
          );
          setTimeout(() => {
            screenbutton.setAttribute(
              "style",
              "background-color: #8ADF7C; opacity: 1"
            );
            this.setState({ bigMessage: "GO!" });
            setTimeout(() => {
              screenbutton.setAttribute(
                "style",
                `transition: background-color 1s, opacity 1s; background-color: ${
                  this.state.bgcolor
                }`
              );
              this.setState({ bigMessage: "" });
            }, 900);
          }, 400);
        }, 900);
      }, 400);
    }, 900);
  };

  submitTap = () => {
    // this.socket.emit('sequence', {id: this.state.id, timestamp:Date.now()})
    this.socket.emit("sequence", this.state.id);
  };

  onFailure = () => {
    let screenbutton = document.getElementsByClassName("screenbutton")[0];
    screenbutton.setAttribute("style", "background-color: red; opacity: 1");
    setTimeout(() => {
      screenbutton.setAttribute(
        "style",
        `transition: background-color 2s, opacity 2s; background-color: ${
          this.state.bgcolor
        }`
      );
    }, 1000);
  };

  onSuccess = () => {
    let screenbutton = document.getElementsByClassName("screenbutton")[0];
    screenbutton.setAttribute(
      "style",
      `opacity: 1;  background-color: ${this.state.bgcolor}`
    );
    setTimeout(() => {
      screenbutton.setAttribute(
        "style",
        `transition: opacity 1s; background-color: ${this.state.bgcolor}`
      );
    }, 300);
  };

  onGreen = () => {
    let screenbutton = document.getElementsByClassName("screenbutton")[0];
    screenbutton.setAttribute("style", "background-color: #8ADF7C; opacity: 1");
    setTimeout(() => {
      screenbutton.setAttribute(
        "style",
        `transition: background-color 2s, opacity 2s; background-color: ${
          this.state.bgcolor
        }`
      );
    }, 1000);
  };

  render() {
    return (
      <div
        className="screenbutton"
        style={{ backgroundColor: this.state.bgcolor }}
        onClick={this.submitTap}
      >
      <Ink />
        <TransitionGroup className="pushbutton-messages">
          {this.state.bigMessage && (
            <CSSTransition
              timeout={{ enter: 100, exit: 1000 }}
              classNames="fademessage"
              key="bigbig"
            >
              <div className="big-message">{this.state.bigMessage}</div>
            </CSSTransition>
          )}
          {this.state.userMessage && (
            <CSSTransition
              timeout={{ enter: 100, exit: 1000 }}
              classNames="fademessage"
              key="usermessage"
            >
              <div className="user-message-box">
                <div className="user-message-player">{this.state.userMessage.player}</div>
                <div className="user-message-player">{this.state.userMessage.message}</div>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }
}
