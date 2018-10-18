import React, { Component } from "react";
import "./steps.css";
import setButtons from "../svg/SetButtons.svg";
import { OutlineButton } from "../Button/Button";

export default class SetButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      roomName: props.roomName
    };
  }

  componentDidMount() {
    document.onkeydown = e => {
      if (e.keyCode === 13) {
        this.handleSubmit();
      }
    };
  }

  handleChange = value => {
    let isDisabled;
    value === "" ? (isDisabled = true) : (isDisabled = false);
    this.setState({ isDisabled, roomName: value });
  };

  handleSubmit = () => {
    this.props.nextPage();
  };

  render() {
    let isDisabled = true;
    let buttonsNumber = this.props.buttonsNumber;
    let message = this.props.message;
    if (buttonsNumber > 1) {
      buttonsNumber = `${buttonsNumber} buttons connected`;
      isDisabled = false;
    } else {
      buttonsNumber = `${buttonsNumber} button connected`;
      isDisabled = true;
    }

    return (
      <div
        style={{
          width: "100vw",
          display: "flex",
          position: "relative",
          zIndex: "1"
        }}
      >
        <main className="tap-main-container">
          <figure>
            <img
              src={setButtons}
              alt="Set Buttons Step"
              className="tap-homelogo one"
            />
          </figure>

          <div className="tap-hometext">
            Add buttons to the game by accessing the following address in any
            smartphone
          </div>

          <div className="tap-input roomname">
            tapcode.it/
            <br />
            {this.state.roomName}
          </div>

          <div className="tap-hometext" style={{ marginTop: "16px" }}>
            Add as many as you want!
          </div>
          <div style={{marginTop: "34px", marginBottom: "-30px"}}>
            <div className="button is-loading superspinner">Loading</div>
            <div className="bottom-message" style={{ marginTop: "0" }}>
              {buttonsNumber}
            </div>
          </div>

          <OutlineButton
            text="Next >"
            isDisabled={isDisabled}
            onClick={e => this.handleSubmit()}
            message={message}
          />
        </main>
      </div>
    );
  }
}
