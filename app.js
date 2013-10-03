/**
 * GuessJS server
 */

var http = require('http');
var path = require('path');
var util = require('util');
var express = require('express');
var procmon = require('procmon');
var config = require('./config');


var app = express();

// all environments
app.set('port', process.env.PORT || config.port || 3000);
app.set('views', __dirname + '/views');
require('./lib/view')(app);
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('1a2b3c4d5e6f'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.logger('dev'));
  app.use(express.session({
    secret: config.session.secret,
    key: config.session.key
  }));
  app.use(app.router);
  app.use(express.errorHandler());
}

// production only
if ('production' === app.get('env')) {
  var RedisStore = require('connect-redis')(express);

  app.use(express.session({
    secret: config.session.secret,
    store: new RedisStore(config.redis)
  }));

  express.logger.token('istDate', function (req, res) {
    return new Date();
  });

  express.logger.token('url', function (req, res) {
    return req.url.split('?')[0];
  });

  app.use(express.logger({
    format: ':istDate :method :url :status :res[Content-Length] :response-time ms'
  }));

  app.use(app.router);
}

require('./routes')(app);

http.createServer(app)
  .on('error', function (err) {
    util.log(util.inspect(err));
    process.exit(1);
  })
  .listen(app.get('port'), function () {
    util.log("GuessJS server listening on port " + app.get('port') + ' in ' + app.get('env'));
  });

// process management
procmon.init();
