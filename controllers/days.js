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


module.exports = {
  index: indexRoute
};
