const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  dayOfTheWeek: { type: String },
  date: { type: String }
  //should be an array because the day has two shifts
  // shifts: [{ type: mongoose.Schema.ObjectId, ref: 'Shift' }]
});

daySchema
  .virtual('shifts', {
    ref: 'Shift',
    localField: '_id',
    foreignField: 'day'
  });

// shifts virtual schema: [{}, {}, {}] matches the id of day in day and day
daySchema.set('toJSON', {
  getters: true,
  virtuals: true
});

module.exports = mongoose.model('Day', daySchema);
