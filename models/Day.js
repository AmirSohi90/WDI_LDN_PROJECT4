const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  dayOfTheWeek: { type: String },
  date: { type: Date }
});

// shifts virtual schema: [{}, {}, {}] matches the id of day in day and day

module.exports = mongoose.model('Day', daySchema);
