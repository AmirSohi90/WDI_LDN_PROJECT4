const User = require('../models/User');

function usersIndex(req, res, next) {
  User
    .find()
    .populate('employee')
    .then(users => res.json(users))
    .catch(next);
}

function showRoute(req, res, next){
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
}

function updateRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => Object.assign(user, req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: showRoute,
  update: updateRoute
};
