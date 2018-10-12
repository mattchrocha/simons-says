import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import {Chat} from './components/chat';
import PushButton from './components/PushButton';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/game/:aquello' component={Chat}/>
          <Route exact path='/:room' component={PushButton}/>
        </Switch>
      </div>
    );
  }
}

export default App;
