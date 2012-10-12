var http = require('http');
var pushover = require('pushover');
var LayOut = require('../../');

var layer = LayOut({
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
