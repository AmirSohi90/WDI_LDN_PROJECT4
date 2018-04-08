const Shift = require('../models/Shift');
const User = require('../models/User');

function indexRoute(req, res, next){
  const data = {};
  Shift.find()
    .populate('employee')
    .then(shifts => data.shifts = shifts)
    .then(() => {
      return User.find()
        .then(users => {
          data.users = users;
          res.json(data);
        });
    })
    .catch(next);
}

function createRoute(req, res, next){
  return Shift.create(req.body)
    .then(shift => res.status(201).json(shift))
    .catch(next);
}


module.exports = {
  index: indexRoute,
  create: createRoute
};
