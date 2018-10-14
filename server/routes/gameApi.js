const express = require('express');
const router  = express.Router();
const Game = require('../models/Game');
const ObjectId = require('mongoose').Types.ObjectId;

/* GET home page */
router.post('/game/newGame', (req, res, next) => {
  const {name} = req.body;
  const creator = new ObjectId(req.body.creator)
  if (!name || !creator){
    next(new Error('You must enter a room name'));
  }

  Game.findOne({ name })
  .then( foundGame => {
    if (foundGame) throw new Error('Room name already exists');

    return new Game({
      name,
      creator
    }).save();
  })
  .then( game => res.json(game)) // Answer JSON
  .catch(e => next(e));

});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
})

module.exports = router;
