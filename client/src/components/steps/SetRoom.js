import React, { Component } from "react";
import "./steps.css";
import setRoom from "../svg/SetRoom.svg";
import {OutlineButton} from '../Button/Button'

export default class SetRoom extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: props.message,
      isDisabled: true,
      roomName: ""
    }
  }
  
  componentDidMount(){
    document.onkeydown = e => {
      if (e.keyCode === 13){
        this.handleSubmit()
      }
    }
  }

  handleChange = (value) => {
    let isDisabled;
    value === "" ? isDisabled = true : isDisabled = false;
    this.setState({isDisabled, roomName: value})
  }
  
  handleSubmit = () => {
    let {roomName} = this.state;
    if (roomName !== "") {
      this.props.getRoom(roomName)
    }
  }

  render() {
    return (
      <div style={{width: "100vw", display: "flex", position:"relative", zIndex: "1"}}>
        <main className="tap-main-container">
        
          <figure>
              <img src={setRoom} alt="Set Room Step" className="tap-homelogo one"/>
          </figure>

          <div className="tap-hometext">
          Add a name to the game room
          </div>

          <input placeholder="YourGameRoom" className="tap-input" value={this.state.roomName} onChange={e => this.handleChange(e.target.value)}></input>

          <OutlineButton text="Next >" isDisabled={this.state.isDisabled} onClick={e => this.handleSubmit()} message={this.state.message}/>

        </main>
      </div>
    );
  }
}

