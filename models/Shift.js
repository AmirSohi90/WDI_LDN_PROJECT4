const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  shiftType: { type: String, enum: ['Afternoon Shift', 'Evening Shift'] },
  employee: { type: mongoose.Schema.ObjectId, ref: 'User' },
  day: { type: mongoose.Schema.ObjectId, ref: 'Day' }
});

module.exports = mongoose.model('Shift', shiftSchema);
