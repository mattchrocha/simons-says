import React, { Component } from "react";
import "../steps/steps.css";
import { OutlineButton } from "../Button/Button";
import PushButton from "./PushButton";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../main/main.css";
import disableScroll from "../../disablescroll";

export default class PushButtonLoader extends Component {
  constructor() {
    super();
    this.state = {
      connected: false
    };
  }

  handleSubmit = () => {
    this.setState({ connected: true });
    disableScroll();
  };

  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          position: "relative",
          zIndex: "0"
        }}
      >
        <TransitionGroup className="connect-button">
          {!this.state.connected && (
            <CSSTransition
              timeout={{ enter: 1000, exit: 900 }}
              classNames="example"
              key="onmarks"
            >
              <main
                className="tap-main-container"
                style={{ paddingBottom: "0", zIndex: "2" }}
              >
                <div className="tap-hometext" style={{ marginBottom: "-30px" }}>
                  Connect this device as a button to game room{" "}
                  <span className="bold-and-underline">
                    {this.props.match.params.room}
                  </span>
                  ?
                </div>
                <OutlineButton
                  text="Connect"
                  isDisabled={false}
                  onClick={e => this.handleSubmit()}
                  color={this.props.color}
                />
              </main>
            </CSSTransition>
          )}
        </TransitionGroup>
        <PushButton room={this.props.match.params.room} isConnected={this.state.connected}/>
      </div>
    );
  }
}
