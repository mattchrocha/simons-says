import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import NewGameForm from './NewGameForm'

export default class Game extends Component {
  constructor(){
    super();
    this.state = {
      room: null
    }
  }

  handleSubmit = name => {
    this.setState({room: name})
  }


  render(){
    return (
      <Route exact path="/" render={() => (
        this.state.room ? (
          <Redirect to={`/game/${this.state.room}`}/>
        ) : (
          <NewGameForm createGame={name => this.handleSubmit(name)}/>
        )
      )}/>
    )
  }

}