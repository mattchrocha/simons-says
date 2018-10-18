// auth/auth-service.js
import axios from 'axios';

class GameService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/game`,
      withCredentials: true
    });
  }

  newGame = (name, creator) => {
    return this.service.post('/newGame', {name, creator})
    .then(response => response.data)
  }

  // login = (username, password) => {
  //   return this.service.post('/login', {username, password})
  //   .then(response => response.data)
  // }

  // loggedin = () => {
  //   return this.service.get('/currentUser',)
  //   .then(response => response.data)
  // }

  // logout = () => {
  //   return this.service.get('/logout',)
  //   .then(response => response.data)
  // }
}

export default GameService;