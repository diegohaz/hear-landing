var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'development';

app.use(function(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect('https://' + req.headers.host + req.path);
  } else {
    return next();
  }
});

app.use(express.static('dist'));
app.use(function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

function startServer() {
  server.listen(port, process.env.IP || '0.0.0.0', function() {
    console.log('Express server listening on %d, in %s mode', port, env);
  });
}

setImmediate(startServer);

exports = module.exports = app;
