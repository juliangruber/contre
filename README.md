
# lay-out

Lay out git repos on a filesystem - github style

## Usage

```javascript
var LayOut = require('lay-out');
var http = require('http');

var layer = LayOut({
  repos : __dirname + '/repos',
  static : __dirname + '/static'
});

layer.on('laid', function(repo, rev) {
  console.log('Laid out ' + repo + '/' + rev);
})

http.createServer(layer.handle()).listen(3000);
```

Now push some repo with a file `foo.txt` to `lay-out`:

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
$ npm install lay-out
```

## API

### LayOut(opts)

`opts` needs:

* `repos`: Directory that contains all repos
* `static`: Directory in which all repos will be layed out

### LayOut#handle()

Returns a new request handler to be passed to `http.createServer()` that does all the stuff.

### LayOut#lay(push|tag)

Used internally by `LayOut#handle()`. Use this if you need to do more on each `push`/`tag`. See `examples/custom`.

## License

(MIT)
