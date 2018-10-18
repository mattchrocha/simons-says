import React, { Component } from "react";
import "./steps.css";
import setRoom from "../svg/SetRoom.svg";
import {OutlineButton} from '../Button/Button'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: props.message,
      isDisabled: true,
      roomName: ""
    }
  }
  
  componentDidUpdate(){

  }
  handleChange = (value) => {
    let isDisabled;
    value === "" ? isDisabled = true : isDisabled = false;
    this.setState({isDisabled, roomName: value})
  }
  

  render() {
    return (
      <div style={{width: "100vw", display: "flex", position:"relative", zIndex: "1"}}>
        <main className="tap-main-container">
        
          <figure>
              <img src={setRoom} alt="TapCode Logo" className="tap-homelogo one"/>
          </figure>

          <div className="tap-hometext">
          Add a name to the game room
          </div>

          <input placeholder="YourGameRoom" className="tap-input" value={this.state.roomName} onChange={e => this.handleChange(e.target.value)}></input>

          <OutlineButton text="Next >" isDisabled={this.state.isDisabled} onClick={e => this.props.nextPage()} message={this.state.message}/>

        </main>
      </div>
    );
  }
}

