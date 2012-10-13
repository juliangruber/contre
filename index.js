var spawn = require('child_process').spawn;
var Seq = require('seq');
var EventEmitter = require('events').EventEmitter;
var pushover = require('pushover');

module.exports = function(opts) {
  if (!opts.from || !opts.to) {
    throw new Error('opts.{from,to} required');
  }
  return new Contre(opts);
};

/**
 * Contre continuous release server
 *
 * @param opts.from repo folder
 * @param opts.to   release folder
 */
function Contre(opts) {
  EventEmitter.call(this);
  this.repos = opts.from;
  this.static = opts.to;
}

Contre.prototype = new EventEmitter;

/**
 * Release pushed code
 *
 * @param push.repo
 * @param push.{branch|version}
 */
Contre.prototype.release = function(push) {
  var self = this;
  var repo = push.repo;
  var repoClean = repo.split('.git')[0];
  var rev = push.branch || push.version;
  var repos = self.repos;

  var dest = self.static + '/' + repoClean + '/' + rev;

  push.on('accept', function() {
    push.on('exit', function() {
      Seq()
        .seq(function() {
          var ps = spawn('git', ['clone', repos + '/' + repo, dest]);
          ps.stderr.pipe(process.stderr, { end : false });
          ps.on('exit', this.ok);
        })
        .seq(function() {
          self.emit('release', repoClean, rev);
          if (rev == 'master') return;
          var ps = spawn('git', ['checkout', rev], { cwd : dest });
        })
      ;
    });
  });
}

/**
 * Host a Contre server
 *
 * @returns {Function} http request handler
 */
Contre.prototype.handle = function() {
  var self = this;
  var repos = pushover(self.repos);

  repos.on('push', function(push) {
    self.release(push);
    push.accept();
  });
  repos.on('tag', function(tag) {
    self.release(tag);
    tag.accept();
  });

  return repos.handle.bind(repos);
}
