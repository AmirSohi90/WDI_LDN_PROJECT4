const User = require('../models/User');

function usersIndex(req, res, next) {
  User
    .find()
    .populate('employee')
    .then(users => res.json(users))
    .catch(next);
}

function showRoute(req, res, next){
  return User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
}

function updateRoute(req, res, next) {
  return User.findById(req.params.id)
    .then(user => Object.assign(user, req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function deleteRoute(req, res, next) {
  return User.findById(req.params.id)
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
