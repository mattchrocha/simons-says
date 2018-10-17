import React, { Component } from "react";
import "./steps.css";
import logo from "../svg/TapCodeLogo.svg";
import Navfix from '../navfix/Navfix';
import Ink from '../react-ink'

export default class Home extends Component {
  render() {
    return (
      <main className="tap-main-container">
       
        <figure>
            <img src={logo} alt="TapCode Logo" className="tap-homelogo one"/>
            <img src={logo} alt="TapCode Logo" className="tap-homelogo two"/>
            <img src={logo} alt="TapCode Logo" className="tap-homelogo three"/>
            <img src={logo} alt="TapCode Logo" className="tap-homelogo four"/>
            <img src={logo} alt="TapCode Logo" className="tap-homelogo five"/>
        </figure>
        <div className="tap-hometext">
        Connect your phones,<br/>memorize the code<br/>and don’t break<br/><span className="bold-and-underline">the chain</span>
        </div>
        <a style={{width: "40px", height:"50px", position:"relative"}}>
          <Ink/>
        </a>

      </main>

    );
  }
}

