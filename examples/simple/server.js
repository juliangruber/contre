var LayOut = require('../../');
var http = require('http');

var layer = LayOut({
  from : __dirname + '/repos',
  to : __dirname + '/static'
});

layer.on('laid', function(repo, rev) {
  console.log('Laid out ' + repo + '/' + rev);
})

http.createServer(layer.handle()).listen(3000);
