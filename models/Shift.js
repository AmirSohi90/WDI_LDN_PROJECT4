const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  shiftType: { type: String, required: 'Please select a shift type' },
  employee: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'Please select an employee' },
  day: { type: mongoose.Schema.ObjectId, ref: 'Day', required: 'Please select a day' }
});

module.exports = mongoose.model('Shift', shiftSchema);
