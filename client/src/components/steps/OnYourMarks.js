import React, { Component } from "react";
import "./steps.css";
import { FilledButton } from "../Button/Button";

export default class OnYourMarks extends Component {

  handleSubmit = () => {
    this.props.nextPage();
  };

  render(){
    let players = this.props.players.join(", ").concat("...");

    return (
      <div
        style={{
          width: "100vw",
          display: "flex",
          position: "relative",
          zIndex: "1"
        }}
      >
        <main className="tap-main-container" style={{paddingBottom: "98px"}}>

          <div>
            <div className="tap-players-onmarks">
              {players}
            </div>
            <div className="tap-onyourmarks">
              On your marks!
            </div>
          </div>

          <FilledButton
            text="Play"
            isDisabled={false}
            onClick={e => this.handleSubmit()}
            color={this.props.color}
          />
        </main>
      </div>
    )
  }
}
