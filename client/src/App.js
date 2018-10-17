import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import { Switch, Route } from "react-router-dom";
// import {Chat} from './components/chat';
import PushButton from "./components/pushbutton/PushButton";
import Game from "./components/game/Game";
import NewGame from "./components/game/NewGame";
import Navbar from "./components/navbar/Navbar";
import "@fortawesome/fontawesome-free/css/all.css";
import disableScroll from "./disablescroll";

import Main from "./components/main/Main";

class App extends Component {
  componentDidMount() {
    // disableScroll();
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Main />
      </div>
    );
  }
}

export default App;

// {/* <Switch>
//           <Route exact path='/game/:room' component={Chat}/>
//           <Route exact path='/:room/:id' component={PushButton}/>
//         </Switch> */}
// {/* <Switch>
//           <Route exact path="/" component={NewGame} />
//           <Route exact path="/game/:room" component={Game} />
//           <Route exact path="/:room" component={PushButton} />
//         </Switch> */}