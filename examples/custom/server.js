var http = require('http');
var pushover = require('pushover');
var Contre = require('../../');

var contre = Contre({
  from : __dirname + '/repos',
  to : __dirname + '/static'
});

var repos = pushover(__dirname + '/repos');

repos.on('push', function(push) {
  contre.release(push);
  push.accept();
});

repos.on('tag', function(tag) {
  contre.release(tag);
  tag.accept();
});

http.createServer(repos.handle.bind(repos))
  .listen(3000);
