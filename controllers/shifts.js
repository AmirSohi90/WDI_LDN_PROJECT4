const Shift = require('../models/Shift');
const User = require('../models/User');

function indexRoute(req, res, next){
  const data = {};
  Shift.find()
    .populate('shifts.employee')
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

function updateRoute(req, res, next){
  return Shift.findById(req.params.id)
    .then(shift => Object.assign(shift, req.body))
    .then(shift => shift.save())
    .then(shift => res.json(shift))
    .catch(next);
}

function showRoute(req, res, next){
  return Shift.findById(req.params.id)
    .then(shift => res.json(shift))
    .catch(next);
}

function deleteRoute(req, res, next) {
  return Shift.findById(req.params.id)
    .then(shift => shift.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  update: updateRoute,
  show: showRoute,
  delete: deleteRoute
};
