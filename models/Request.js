const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userOne: {type: mongoose.Schema.ObjectId, ref: 'User'},
  userTwo: {type: mongoose.Schema.ObjectId, ref: 'User'},
  status: {type: String, default: 'Pending', enum: ['Accepted', 'Pending', 'Declined']},
  shiftOne: {type: mongoose.Schema.ObjectId, ref: 'Shift'},
  shiftTwo: {type: mongoose.Schema.ObjectId, ref: 'Shift'}
},
{ timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
