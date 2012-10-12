var pushover = require('pushover');
var http = require('http');
var wd = require('./lib/wd');
var spawn = require('child_process').spawn;
var mkdirp = require('mkdirp');
var Seq = require('seq');

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;
var reposPath = process.env.REPOS || __dirname+'/repos';
var publicPath = process.env.PUBLIC || __dirname+'/public';

var repos = pushover(reposPath);

function store(opts) {
  var public = opts.public + '/' + opts.repo + '/' + opts.co;
  Seq()
    .seq(function() {
      var ps = spawn('git', [
        'clone', 'http://' + host + ':' + port + '/' + opts.repo,
        public
      ]);
      ps.stderr.pipe(process.stderr, { end : false });
      ps.on('exit', this.ok);
    })
    .seq(function() {
      if (opts.co == 'master') return;
      var ps = spawn('git', ['checkout', opts.co], { cwd : public });
      ps.stderr.pipe(process.stderr, { end : false });
    })
  ;
}

repos.on('push', function(push) {
  store({
    repo : push.repo,
    public : publicPath,
    co : push.branch
  });

  push.accept();
});

repos.on('tag', function(tag) {
  store({
    repo : tag.repo,
    public : publicPath,
    co : tag.version
  })

  tag.accept();
})

var server = http.createServer(function(req, res) {
  repos.handle(req, res);
});

server.listen(port, function() {
  console.log('Server listening on port', port);
});
