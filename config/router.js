const router = require('express').Router();
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const days = require('../controllers/days');
const shifts = require('../controllers/shifts');
const requests = require('../controllers/requests');

router.route('/days')
  .get(days.index)
  .post(days.create);

router.route('/days/:id')
  .get(days.show)
  .put(days.update)
  .delete(days.delete);

router.route('/shifts')
  .get(shifts.index)
  .post(shifts.create);

router.route('/shifts/:id')
  .get(shifts.index)
  .put(shifts.update)
  .delete(shifts.delete);

router.route('/requests/')
  .get(requests.index)
  .post(requests.create);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
