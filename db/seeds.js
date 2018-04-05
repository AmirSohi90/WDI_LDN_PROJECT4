const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');

const User = require('../models/User');
// const Shift = ('../models/Shift');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();
  User.create([{
    username: 'JeffSmith',
    firstName: 'Jeff',
    lastName: 'Smith',
    email: 'jeff-smith@jeff.com',
    jobRole: 'Manager',
    employer: true,
    password: 'password',
    passwordConfirmation: 'password'
  }])
    .then(users => console.log(`${users.length} users created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
