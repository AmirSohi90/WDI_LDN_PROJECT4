const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  employees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  shiftType: { type: String, enum: ['Afternoon Shift', 'Evening Shift'] },
  date: { type: String }
});

module.exports = mongoose.model('Shifts', shiftSchema);
