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

describe('POST /days', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Day.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      })
      .then(done);
  });

  it('should return a 201 response with a token', done => {
    api
      .post('/api/days')
      .set('Authorization', `Bearer ${token}`)
      .send(dayData[0])
      .expect(201, done);
  });

  it('should return the correct data', done => {
    api
      .post('/api/days')
      .set('Authorization', `Bearer ${token}`)
      .send(dayData[0])
      .end((err, res) => {
        expect(res.body.dayOfTheWeek).to.eq(dayData[0].dayOfTheWeek);
        expect(res.body.date).to.eq(dayData[0].date);
        done();
      });
  });
});
