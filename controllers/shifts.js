const Shift = require('../models/Shift');
const User = require('../models/User');

function indexRoute(req, res, next){
  const data = {};
  Shift.find()
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
  Shift.create(req.body)
    .then(shift => res.status(201).json(shift))
    .catch(next);
}
//
// function updateRoute(req, res, next){
//   Shift.findById(req.params.id)
//     .then(shift => Object.assign(shift, req.body))
//     .then(shift => shift.save())
//     .then(shift => res.json(shift))
//     .catch(next);
// }

module.exports = {
  index: indexRoute,
  create: createRoute
};
