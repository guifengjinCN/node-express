var mongoose = require('mongoose');
var config = require('./index.js');

module.exports = function () {
  var db = mongoose.connect(config.mongodb, { useNewUrlParser: true }, function (err) {
    if (err) {
      console.log('Connection Error:' + err)
    } else {
      console.log('Connection success!')
    }
  });
  require('../models/user.js');
  return db;
}