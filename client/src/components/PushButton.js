import React from 'react';
import io from 'socket.io-client';

export default class PushButton extends React.Component{
  constructor(props){
    console.log("prueba")
      console.log(props)
    super(props);
    this.state = {
      room: props.match.params.room,
      buttonid: props.match.params.id
    }
  }

  componentDidMount(){
    this.socket = io('localhost:3010');

    this.socket.on('connect', () => {
      this.socket.emit('room', this.state.room);
    });
  }

  submitTap = () => {
    this.socket.emit('message', {msg: this.state.buttonid, timestamp:Date.now()})
  }

  render(){
    return (
      <div>
        <button onClick={this.submitTap}>holi</button>
      </div>
    )
  }

}