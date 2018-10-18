import React, { Component } from "react";
import "./steps.css";
import setPlayers from "../svg/SetPlayers.svg";
import {OutlineButton} from '../Button/Button';

export default class SetPlayers extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: "Add at least one player",
      isDisabled: true,
      player: "",
      newPlayers: []
    }
  }

  handleChange = (value) => {
    // let isDisabled;
    // value === "" ? isDisabled = true : isDisabled = false;
    
    this.setState({player: value})
  }

  componentDidMount(){
    document.onkeydown = e => {
      if (e.keyCode === 13 && this.state.player !== ""){
        this.addPlayer()
      }
    }
  }

  addPlayer = () => {
    let {player} = this.state;
    if (player !== ""){
      let {newPlayers} = this.state
      newPlayers.push(player);
      this.setState({newPlayers, player: "", isDisabled: false, message: ""})
      console.log(this.state.newPlayers)
    }
  }
  
  handleSubmit = () => {
    let {newPlayers} = this.state;
    if (newPlayers.length > 0) {
      this.props.getPlayers(newPlayers)
    }
  }

  removePlayer = (playerName) => {
    let {newPlayers, isDisabled, message} = this.state;
    newPlayers.splice(newPlayers.indexOf(playerName),1);
    if (newPlayers.length === 0){
      isDisabled = true;
      message = "Add at least one player"
    } else {
      isDisabled = false;
      message = "";
    }
    this.setState({newPlayers, isDisabled, message})
  }

  render() {
    let players = this.state.newPlayers.map(playerName => {
      return (
        <div key={playerName} className="new-player-box">
          <button className="tap-bttn-addplayer" onClick={e=> this.removePlayer(playerName)}>-</button>
          <div className="new-player-name">{playerName}</div>
        </div>
      )
    })

    return (
      <div style={{width: "100vw", display: "flex", position:"relative", zIndex: "1"}}>
        <main className="tap-main-container">
        
          <figure>
              <img src={setPlayers} alt="Set player Section" className="tap-homelogo one"/>
          </figure>

          <div className="tap-hometext">
            <div className="new-players">
              {players}
            </div>
            <div className="add-player">
              <input placeholder="Add player" className="tap-input-player" value={this.state.player} onChange={e => this.handleChange(e.target.value)}/>
              <button className="tap-bttn-addplayer" onClick={e=> this.addPlayer()}>+</button>
            </div>
          </div>

          

          <OutlineButton text="Next >" isDisabled={this.state.isDisabled} onClick={e => this.handleSubmit()} message={this.state.message}/>

        </main>
      </div>
    );
  }
}


