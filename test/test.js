var LayOut = require('../');
var should = require('should');
var fs = require('fs');

var layer;
var work = '/tmp/'+Math.random().toString(16).slice(2);
fs.mkdirSync(work);

describe('LayOut', function() {
  beforeEach(function() {
    layer = LayOut({
      
    })
  });
  it('should create directories', function() {
  
  });
  describe('.handle()', function() {
    it('should return a function with 2 arguments', function() {
    })
  });
  describe('.lay(push)')
});
