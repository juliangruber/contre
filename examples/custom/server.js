var http = require('http');
var pushover = require('pushover');
var Layout = require('../../');

var layer = Layout({
  repos : __dirname + '/repos',
  static : __dirname + '/static'
});

var repos = pushover(__dirname + '/repos');

repos.on('push', function(push) {
  layer.lay(push);
  push.accept();
});

repos.on('tag', function(tag) {
  layer.lay(tag);
  tag.accept();
});

http.createServer(repos.handle.bind(repos))
  .listen(3000);
