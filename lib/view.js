/**
 * View options - globally available variables
 */

module.exports = function (app) {
  app.set('view engine', 'jade');

  var locals = {
    env: app.settings.env,
    title: 'Guess',
    pretty: (app.settings.env !== 'production')
  };

  app.locals(locals);
};
