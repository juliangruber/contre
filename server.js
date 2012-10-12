var http = require('http');
var pushover = require('pushover');
var filed = require('filed');
var Store = require('./lib/store');

var store = Store({
  host : 'localhost',
  port : 3000,
  root : __dirname + '/static'
})

var repos = pushover(__dirname + '/repos');

repos.on('push', function(push) {
  push.accept();
  store(push.repo, push.branch);
});

repos.on('tag', function(tag) {
  tag.accept();
  store(tag.repo, tag.version);
})

http.createServer(function(req, res) {
  repos.handle(req, res);
}).listen(3000);

http.createServer(function(req, res) {
  req
    .pipe(filed(__dirname + '/static' + req.url))
    .pipe(res)
  ;
}).listen(8000);
