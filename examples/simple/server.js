var Layout = require('../../');
var http = require('http');

var layer = Layout({
  repos : __dirname + '/repos',
  static : __dirname + '/static'
});

layer.on('laid', function(repo, rev) {
  console.log('Laid out ' + repo + '/' + rev);
})

http.createServer(layer.handle()).listen(3000);
