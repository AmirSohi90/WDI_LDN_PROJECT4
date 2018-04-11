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

describe('DELETE /days/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Day.remove({})
    ])
      .then(() => Promise.props({
        days: Day.create(dayData),
        user: User.create(userData)
      }))
      .then(data => {
        day = data.days[0];
        token = jwt.sign({ sub: data.user._id }, secret, { expiresIn: '5m' });
      })
      .then(done);
  });

  it('should return a 401 response', done => {
    api
      .delete(`/api/days/${day._id}`)
      .expect(401, done);
  });

  it('should return a 204 response with a token', done => {
    api
      .delete(`/api/days/${day._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204, done);
  });

  it('should return no data', done => {
    api
      .delete(`/api/days/${day._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.empty;
        done();
      });
  });
});
