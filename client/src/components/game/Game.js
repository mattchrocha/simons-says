import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PushButton from '../PushButton';
import NewGameForm from './NewGameForm';
import GameService from './GameService';

class Game extends Component {
  constructor(){
    super();
    this.service = new GameService();
    this.state = {
      game: null
    }
  }

  newGame = (name) => {
    let creator = "5bbe158395b68f1bcbe52963"
    
    this.service.newGame(name, creator)
      .then(game => {
        
        this.setState({game: game.name})
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="Game">
        {!this.state.game?
          <NewGameForm createGame={name => this.newGame(name)}/>
          :
        <Switch>

          <Route exact path='/:room/:id' component={PushButton}/>
        </Switch>
        }
      </div>
    );
  }
}

export default Game;
