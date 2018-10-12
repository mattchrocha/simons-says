const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const pushbuttonSchema = new Schema({
  link: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Pushbutton = mongoose.model('Pushbutton', pushbuttonSchema);
module.exports = Pushbutton;
