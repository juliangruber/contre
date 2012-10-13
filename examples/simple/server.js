var Contre = require('../../');
var http = require('http');

var contre = Contre({
  from : __dirname + '/repos',
  to : __dirname + '/static'
});

contre.on('release', function(repo, rev) {
  console.log('released ' + repo + '/' + rev);
});

http.createServer(contre.handle()).listen(3000);
