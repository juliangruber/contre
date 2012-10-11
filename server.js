var pushover = require('pushover');
var http = require('http');

var port = process.env.PORT || 3000;
var reposPath = process.env.REPOS || __dirname+'/repos';

var repos = pushover(reposPath);

repos.on('push', function(push) {
  var repo = push.repo;
  var cwd = push.cwd;
  var commit = push.commit;
  var branch = push.branch;
  console.log(push);
  push.accept();
});

var server = http.createServer(function(req, res) {
  console.log(req);
  repos.handle(req, res);
});

server.listen(port, function() {
  console.log('Server listening on port', port);
});
