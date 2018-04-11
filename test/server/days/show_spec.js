/* global api, describe, it, expect, beforeEach */

const Day = require('../../../models/Day');
const User = require('../../../models/User');

const dayData = [{
  dayOfTheWeek: 'Monday',
  date: '2018-05-07'
}, {
  dayOfTheWeek: 'Tuesday',
  date: '2018-05-08'
}];

let day;

describe('GET /days/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Day.remove({})
    ])
      .then(() => Day.create(dayData))
      .then(days => day = days[0])
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get(`/api/days/${day._id}`)
      .expect(200, done);
  });

  it('should return a day', done => {
    api
      .get(`/api/days/${day._id}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
          '_id',
          'dayOfTheWeek',
          'date'
        ]);
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get(`/api/days/${day._id}`)
      .end((err, res) => {
        expect(res.body.dayOfTheWeek).to.eq(dayData[0].dayOfTheWeek);
        expect(res.body.date).to.eq(dayData[0].date);
        done();
      });
  });
});
