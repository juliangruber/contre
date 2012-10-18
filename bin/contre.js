#!/usr/bin/env node

var Contre = require('..');
var http = require('http');
var fs = require('fs');
var path = require('path');

if (!exists('repos')) fs.mkdirSync('repos');
if (!exists('static')) fs.mkdirSync('static');

var contre = Contre({
  from : 'repos',
  to : 'static'
});

var port = process.argv[2] || 3000;
http.createServer(contre.handle()).listen(port, function() {
  console.log('contre listening on port ' + port);
});

function exists(file) {
  return (fs.existsSync || path.existsSync)(file);
}
