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

describe('GET /days', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Day.remove({})
    ])
      .then(() => Day.create(dayData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get('/api/days')
      .expect(200, done);
  });

  it('should return an object of days', done => {
    api
      .get('/api/days')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        res.body.days.forEach(banger => {
          expect(banger).to.include.keys([
            '_id',
            'dayOfTheWeek',
            'date'
          ]);
        });
        done();
      });
  });

});
