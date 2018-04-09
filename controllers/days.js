const Day = require('../models/Day');
const User = require('../models/User');

function indexRoute(req, res, next){
  const data = {};
  Day.find()
    .populate('shifts')
    .then(days => data.days = days)
    .then(() => {
      return User.find()
        .then(users => {
          data.users = users;
          res.json(data);
        });
    })
    .catch(next);
}

function createRoute(req, res, next) {
  return Day.create(req.body)
    .then(day => res.status(201).json(day))
    .catch(next);
}

function updateRoute(req, res, next) {
  return Day.findById(req.params.id)
    .then(day => Object.assign(day, req.body))
    .then(day => day.save())
    .then(day => res.json(day))
    .catch(next);
}

function showRoute(req, res, next) {
  return Day.findById(req.params.id)
    .populate('shifts')
    .then(day => res.json(day))
    .catch(next);
}

function deleteRoute(req, res, next) {
  return Day.findById(req.params.id)
    .then(day => day.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}


module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
