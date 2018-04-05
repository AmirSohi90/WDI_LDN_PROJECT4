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
  }, {
    username: 'TomK',
    firstName: 'Tom',
    lastName: 'Keough',
    email: 'tom@tom.com',
    jobRole: 'Bartender',
    employer: false,
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'SuiS',
    firstName: 'Sui',
    lastName: 'Shum',
    email: 'sui@sui.com',
    jobRole: 'Bartender',
    employer: false,
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'NicW',
    firstName: 'Nic',
    lastName: 'Wilson',
    email: 'nic@nic.com',
    jobRole: 'Bartender',
    employer: false,
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'HelenaC',
    firstName: 'Helena',
    lastName: 'Charles',
    email: 'helena@helena.com',
    jobRole: 'Bartender',
    employer: false,
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'ReenaV',
    firstName: 'Reena',
    lastName: 'Verma',
    email: 'reena@reena.com',
    jobRole: 'Bartender',
    employer: false,
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'MarkT',
    firstName: 'Mark',
    lastName: 'Tran',
    email: 'mark@mark.com',
    jobRole: 'Chef',
    employer: false,
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'AimeeA',
    firstName: 'Aimee',
    lastName: 'Attenborough',
    email: 'aimee@aimee.com',
    jobRole: 'Su Chef',
    employer: false,
    password: 'password',
    passwordConfirmation: 'password'
  }])
    .then(users => console.log(`${users.length} users created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
