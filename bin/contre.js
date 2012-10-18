#!/usr/bin/env node

var Contre = require('..');
var http = require('http');
var fs = require('fs');
var path = require('path');

if (!fs.existsSync('repos')) fs.mkdirSync('repos');
if (!fs.existsSync('static')) fs.mkdirSync('static');

var contre = Contre({
  from : 'repos',
  to : 'static'
});

var port = process.argv[2] || 3000;
http.createServer(contre.handle()).listen(port, function() {
  console.log('contre listening on port ' + port);
});

var exists = function(file) {
  return (fs.existsSync || path.existsSync)(file);
}
