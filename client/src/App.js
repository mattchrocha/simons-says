import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { Switch, Route } from 'react-router-dom';
// import {Chat} from './components/chat';
// import PushButton from './components/PushButton';
import Game from './components/game/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game/>
      </div>
    );
  }
}

export default App;


// {/* <Switch>
//           <Route exact path='/game/:room' component={Chat}/>
//           <Route exact path='/:room/:id' component={PushButton}/>
//         </Switch> */}