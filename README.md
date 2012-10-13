
# gitlaid

Lay out git repos on a filesystem - github style

## Usage

```javascript
var GitLaid = require('gitlaid');
var http = require('http');

var layer = GitLaid({
  from : __dirname + '/repos',
  to : __dirname + '/static'
});

layer.on('laid', function(repo, rev) {
  console.log('Laid out ' + repo + '/' + rev);
})

http.createServer(layer.handle()).listen(3000);
```

Now push some repo with a file `foo.txt` to `gitlaid`:

```bash
$ git push http://localhost:3000/test.git master
$ git push --tags http://localhost:3000/test.git
...
$ ls repos
test.git
$ tree static
static/
└── test
    ├── master
    │   └── foo.txt
    └── 0.0.1
        └── foo.txt
```

Tadaa!

## Installation

```bash
$ npm install gitlaid
```

## API

### GitLaid(opts)

Required `opts`:

* `from`: Directory that contains all repos
* `to`: Directory in which all repos will be layed out

### GitLaid#handle()

Returns a new request handler to be passed to `http.createServer()` that does
all the stuff.

### GitLaid#lay(push|tag)

Used internally by `GitLaid#handle()`. Use this if you need to do more on each
push/tag. See `examples/custom`.

## License

(MIT)
