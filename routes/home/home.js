/**
 * Render home page.
 */

var util = require('util');

var home = {
  index: function (req, res, next) {
    res.render('index');
  }
};

module.exports = home;
