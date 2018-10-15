import React from 'react';
import io from 'socket.io-client';
import './pushbutton.css';
import './scripts.js';

export default class PushButton extends React.Component{
  constructor(props){
    console.log("prueba")
      console.log(props)
    super(props);
    this.state = {
      room: props.match.params.room,
      id: null,
      bgcolor: "aquamarine"
      // buttonid: props.match.params.id
    }
  }

  componentDidMount(){
    this.socket = io('localhost:3010');
    
    this.socket.on('connect', () => {
      this.socket.emit('room', this.state.room);
      this.setState({id: this.socket.id});
    });

    this.socket.on('feedback', feedback => {
      if (feedback === "failure") this.onFailure()
    });
  }

  submitTap = () => {
    // this.socket.emit('sequence', {id: this.state.id, timestamp:Date.now()})
    this.socket.emit('sequence', this.state.id)
  }

  onFailure = () => {
    let screenbutton = document.getElementsByClassName('screenbutton')[0];
    screenbutton.setAttribute("style", "background-color: red; opacity: 1");
    setTimeout(() => {
      screenbutton.setAttribute("style", `transition: background-color 2s, opacity 2s; background-color: ${this.state.bgcolor}`);
    }, 1000)
  }

  onSuccess = () => {
    let screenbutton = document.getElementsByClassName('screenbutton')[0];
    screenbutton.setAttribute("style", `opacity: 1;  background-color: ${this.state.bgcolor}`);
    setTimeout(() => {
      screenbutton.setAttribute("style", `transition: opacity 2s; background-color: ${this.state.bgcolor}`);
    }, 1000)
  }

  render(){
    return (
      <div className="screenbutton" style={{backgroundColor: this.state.bgcolor}} onClick={this.submitTap}>
      </div>
    )
  }

}