const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  dayOfTheWeek: { type: String, required: true },
  date: { type: String, required: true, unique: true }
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
