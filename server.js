var pushover = require('pushover');
var http = require('http');
var through = require('through');

var port = process.env.PORT || 3000;
var reposPath = process.env.REPOS || __dirname+'/repos';

var repos = pushover(reposPath);

repos.on('push', function(push) {
  var repo = push.repo;
  var cwd = push.cwd;
  var commit = push.commit;
  var branch = push.branch;
  push.accept();
});

var server = http.createServer(function(req, res) {
  console.log();
  console.log('url', req.url);
  console.log('method', req.method);

  var inspect = through(function(data) {
    console.log(data.toString());
    this.emit('data', data);
  });
  inspect.setHeader = res.setHeader;
  inspect.pipe(res);
  repos.handle(req, inspect);
});

server.listen(port, function() {
  console.log('Server listening on port', port);
});
