const Request = require('../models/Request');
// const User = require('../models/User');

function requestsIndex(req, res, next) {
  Request
    .find()
    .populate('userOne')
    .populate('userTwo')
    .populate('shiftOne')
    .populate('shiftTwo')
    .then(requests => res.json(requests))
    .catch(next);
}

function createRoute(req, res, next){
  return Request.create(req.body)
    .then(request => res.status(201).json(request))
    .catch(next);
}

function updateRoute(req, res, next){
  return Request.findById(req.params.id)
    .then(request => Object.assign(request, req.body))
    .then(request => request.save())
    .then(request => res.json(request))
    .catch(next);
}

module.exports = {
  index: requestsIndex,
  create: createRoute,
  update: updateRoute
};
