const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const gameSchema = new Schema({
  name: {type: String, unique: true},
  pushbuttons: [{type: Schema.Types.ObjectId, ref: "Pushbutton"}],
  sequence: [{type: Schema.Types.ObjectId, ref: "Pushbutton"}],
  open: {type: Boolean, default: true},
  creator: {type: Schema.Types.ObjectId, ref: "User"},
  participants: [{type: String}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
