import React, { Component } from "react";
import "./steps.css";
import logo from "../svg/TapCodeLogo.svg";
import {OutlineButton} from '../Button/Button'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: props.message
    }
  }
  render() {
    return (
      <div style={{width: "100vw", display: "flex", position:"relative", zIndex: "1"}}>
        <main className="tap-main-container">
        
          <figure>
              <img src={logo} alt="TapCode Logo" className="tap-homelogo one"/>
              <img src={logo} alt="TapCode Logo" className="tap-homelogo two"/>
              <img src={logo} alt="TapCode Logo" className="tap-homelogo three"/>
              <img src={logo} alt="TapCode Logo" className="tap-homelogo four"/>
              <img src={logo} alt="TapCode Logo" className="tap-homelogo five"/>
          </figure>

          <div className="tap-hometext small">
          Connect your phones,<br/>memorize the code<br/>and don’t break<br/><span className="bold-and-underline">the chain</span>
          </div>

          <OutlineButton text="Play" onClick={e => this.props.nextPage()} message={this.state.message}/>

        </main>
      </div>
    );
  }
}

