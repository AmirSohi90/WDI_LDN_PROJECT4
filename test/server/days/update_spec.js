/* global api, describe, it, expect, beforeEach */

const Day = require('../../../models/Day');
const User = require('../../../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const dayData = [{
  dayOfTheWeek: 'Monday',
  date: '2018-05-07'
}, {
  dayOfTheWeek: 'Tuesday',
  date: '2018-05-08'
}];

const userData = { username: 'test', firstName: 'test', lastName: 'test', jobRole: 'test', email: 'test@test.com', password: 'test', passwordConfirmation: 'test' };
let token;
let day;

describe('GET /days/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Day.remove({})
    ])
      .then(() => Promise.props({
        day: Day.create(dayData[0]),
        user: User.create(userData)
      }))
      .then(data => {
        day = data.day;
        token = jwt.sign({ sub: data.user._id }, secret, { expiresIn: '5m' });
      })
      .then(done);
  });


  it('should return a 200 response with a token', done => {
    api
      .put(`/api/days/${day._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(dayData[1])
      .expect(200, done);
  });

  it('should return a day', done => {
    api
      .put(`/api/days/${day._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(dayData[1])
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
      .put(`/api/days/${day._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(dayData[1])
      .end((err, res) => {
        expect(res.body.dayOfTheWeek).to.eq(dayData[1].dayOfTheWeek);
        expect(res.body.date).to.eq(dayData[1].date);
        done();
      });
  });
});
