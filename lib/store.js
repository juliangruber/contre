var spawn = require('child_process').spawn;
var Seq = require('seq');

module.exports = Store;

function Store(opts) {
  var host = opts.host || 'localhost';
  var port = opts.port || '80';
  var root = opts.root;

  return function store(repo, rev) {
    // repo without .git
    var segs = repo.split('.');
    if (segs[segs.length - 1] == 'git') segs.pop();
    var repoClean = segs.join('');

    var dest = root + '/' + repoClean + '/' + rev;

    Seq()
      .seq(function() {
        console.log('Cloning', repo, 'into', dest);
        var ps = spawn('git', [
          'clone', 'http://' + host + ':' + port + '/' + repo,
          dest
        ]);
        ps.stderr.pipe(process.stderr, { end : false });
        ps.on('exit', this.ok);
      })
      .seq(function() {
        console.log('Checking out', rev, 'at', repo);
        if (rev == 'master') return;
        // no detached head warnings
        spawn('git', ['checkout', rev], { cwd : dest });
      })
    ;
  }
}

